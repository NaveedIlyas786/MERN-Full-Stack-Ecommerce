const ErrorHandler =require("../utils/ErrorHandler")

module.exports =(err, req,res, next)=>{

    err.statusCode = err.statusCode || 500
    err.message =err.message || "Internal Server Error"
    
    //! "Wrong MongoDB id Error"
    
    if(err.name === "CastError"){
        const message = `Resource not Found inavlid ${err.path}`;
        err = new ErrorHandler(message, 400)  //? means bad request
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack
    }); 
}

