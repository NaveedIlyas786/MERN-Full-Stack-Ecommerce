// it is used to handle the try catch errors, means Promise.resolve is using here as try, and catch as same thing

module.exports = (theFunc) => (req, res, next) => {
  //! Here the arrow function is taking an another function "theFunc" as argument
  Promise.resolve(theFunc(req, res, next)).catch(next)
}
