const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("Token:", token); // Debug log

    if (!token) {
        console.log("No token found"); // Debug log
        return next(new ErrorHandler("Please login to access this resource!", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    // console.log("Authenticated User:", req.user); // Debug log

    if (!req.user) {
        console.log("User not found"); // Debug log
        return next(new ErrorHandler("User not found", 404));
    }

    next();
});

exports.authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userRole)) {
            return next(new ErrorHandler(`Role: ${req.user.userRole} is not allowed to access this resource`, 403)); // 403 error means Server understands the request but refuses it
        }
        next();
    };
};
