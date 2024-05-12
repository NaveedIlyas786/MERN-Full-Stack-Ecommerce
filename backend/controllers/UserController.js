const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const User = require("../models/UserModels");
const sendToken = require("../utils/jwtToken");

// Register New User

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

  const isPasswordMatched =await findUser.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email & Password", 401)); //? 401 means unauthurized user
  }
  
  sendToken(findUser, 200, res)
});