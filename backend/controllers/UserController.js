const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const User = require("../models/UserModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//! Register New User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample ID",
      url: "Profile_Pic_Url",
    },
  });
 
  sendToken(newUser, 201, res);
});
//! After User registeration we will make function of User Login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //? if we don't have email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  //? if we have email and password, then we shall find user from mongoDB

  const findUser = await User.findOne({ email }).select("+password");

  if (!findUser) {
    return next(new ErrorHandler("Invalid Email & Password", 401)); //? 401 means unauthurized user
  }

  const isPasswordMatched = await findUser.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email & Password", 401)); //? 401 means unauthurized user
  }

  sendToken(findUser, 200, res);
});

//! After User Login we will make function of User Logout

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    //? Here we are setting here the token value to null (Means here we are setting that when token value would be null then 3rd parameter is that options, means then options section would execute)
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Successfully!",
  });
});

//! Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }

  //! Get ResetPassword token

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  //? during creating the link we replaced the http through *{req.protocol}* and enviroment for live as well as for localhost through "{req.get("host")}"

  //? and Now this is the link "resetPasswordUrl"

  const message = `Your Reset Password Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested the Email, then please Ignore it`;
  //? We also set the message which will be displayed at the Body of Email

  try {
    //? we shall make the functoin with name "sendEmail"
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery!",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Send To ${user.email} Successfully!`,
    });
  } catch (error) {
    //? If Error Occurs then we have to *undefined* the *resetPasswordToken* and *resetPasswordExpire* and have to save it.

    this.resetPasswordToken = undefined;
    this.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//! After Token getting -> Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //? Creating token hash and find this from MongoDb database
  const resetPasswordToken_hash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const findedUser = await User.findOne({
    resetPasswordToken: resetPasswordToken_hash,
    resetPasswordExpire: { $gt: Date.now() }, //? Means "resetPasswordExpire" should be greater than current time
  });
  if (!findedUser) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired!",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match!", 400));
  }

  findedUser.password = req.body.password;
  //? Now password has been changed, and now we have to undefined these things, kio k koi matlab nai banta inka jab tak user again request na kary

  findedUser.resetPasswordToken = undefined;
  findedUser.resetPasswordExpire = undefined;
  //? Now we shall use the save method to save the findedUser

  await findedUser.save();

  //? After saving the user, we shall also login the user at the same time, so call sendtoken Function

  sendToken(findedUser,200,res)
});
