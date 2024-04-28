module.exports = (theFunc) => ( req, res, next) => { //! Here the arrow function is taking an another function "theFunc" as argument
    Promise.resolve(theFunc(req,res,next)).catch(next)
  }