const ErrorHandler = require('../utils/ErrorHandler')
// it is used to display Internal server error, bad request with status code and error message
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  //! "Wrong MongoDB id cast Error"
  // means if the id of product is wrong/not complete in api during update the details of product then this cast error occurs
  if (err.name === 'CastError') {
    const message = `Resource not Found inavlid ${err.path}`
    err = new ErrorHandler(message, 400) //? means bad request
  }

  //! "Mongoose Duplicate Key Error"
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered!`

    err = new ErrorHandler(message, 400) //? means bad request
  }

  //! "Wrong JWT(jsonWebToken) Error"
  if (err.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again`

    err = new ErrorHandler(message, 400) //? means bad request
  }

  //! "JWT(jsonWebToken) Expire Error"
  if (err.name === 'TokenExpiredError') {
    const message = `Json Web Token is expired, Try again`

    err = new ErrorHandler(message, 400) //? means bad request
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack,
  })
}
