//TODO: Here, we will handle all backend Errors in one file and use it in all other files

class ErrorHandler extends Error {
  //! its means we inherited new class "ErrorHandler" from node default class "Error"
  constructor(message, getstatusCode) {
    super(message); //! Here we are using "super" keyword to get message obtained from upperside, We can understand "super" is the constructor of "Error" class
    this.statusCode = getstatusCode; //! we are executing/extending node Default class "Error", we can acces its all properties/methods now

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

//! Now we have to make also a "middleware" folder in backned folder
