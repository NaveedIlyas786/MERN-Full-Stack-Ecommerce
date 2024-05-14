const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModels");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
    const {token} = req.cookies;
    // console.log("token",token);
    if(!token){
        return next(new ErrorHandler("please Login to access this resource!", 401))
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id) //! here the id, we are taking is from function "getJWTToken" in UserModels where mogngoDb "_id" is stored in "id" 
   
next();
})

exports.authorizedRole = (...roles)=>{
return (req,res,next)=>{
    if(!roles.includes(req.user.userRole)){
      return next( new ErrorHandler(`Role: ${req.user.userRole} is not allowed to access this resource`,403)) //? this 403 error means Server has understand what you want to do, but refused you!
    }
    next()
}
}




