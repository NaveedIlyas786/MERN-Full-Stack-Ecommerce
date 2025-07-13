const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const crypto = require('crypto') // we don't need to install this, it is built_in function

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    maxLength: [30, 'Name Cannot exceeds than 30'],
    minLength: [3, 'Name Should not less than 3'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter Valid Email!'],
  },
  password: {
    type: String,
    required: [true, 'Please Provide A Password'],
    minLength: [8, 'Password should be atleast 8 characters'],
    select: false, // it means when we shall get user information, then password will not included in object of user object
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  userRole: {
    type: String,
    default: 'user',
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

//! Encrypt password before saving the user to database

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //? Means if user update name and email only then password would not effected/changed/hashed again if it is not changed, then it will move to next step
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

//! After Registeration of User we shall Logged in the User at the same time, on mostly web site this approach is followed So,
//! we have to generate the jwtToken as user would registered and would stored in the cookie, after this our server would know that this user can use the mentioned routes

//!   *******   JWT Token "getJWTToken" function   ***********
userSchema.methods.getJWTToken = function () {
  return jwtToken.sign(
    {
      id: this._id, //? this "_id" is the user id stored in the mongo DB
    },
    process.env.JWT_SECRET, //? this is the key, thorught which anyone can create many fake admin accounts
    {
      //? here are the options that are mentioning, when you would logged out (means after how much days)
      expiresIn: process.env.JWT_EXPIRE,
    }
  )
}

//!   *******   Compare Password "comparePassword" function  *********

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//!   **********   Generating Reset Password Token  ***********

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  //? Now we need to Hash it, and add to the userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  //? Now we have to set also the Token Expire Time, we set here 15 minutes

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', userSchema)
