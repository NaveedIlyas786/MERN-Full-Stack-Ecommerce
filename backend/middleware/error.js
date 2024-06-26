const ErrorHandler =require("../utils/ErrorHandler")

module.exports =(err, req,res, next)=>{

    err.statusCode = err.statusCode || 500
    err.message =err.message || "Internal Server Error"
    
    //! "Wrong MongoDB id Error"
    
    if(err.name === "CastError"){
        const message = `Resource not Found inavlid ${err.path}`;
        err = new ErrorHandler(message, 400)  //? means bad request
    }
    
    //! "Mongoose Duplicate Key Error"
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered!`;

        err = new ErrorHandler(message, 400)  //? means bad request
      }
    
    //! "Wrong JWT(jsonWebToken) Error"
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;

        err = new ErrorHandler(message, 400)  //? means bad request
      }
    
    //! "JWT(jsonWebToken) Expire Error"
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, Try again`;

        err = new ErrorHandler(message, 400)  //? means bad request
      }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack
    }); 
}

