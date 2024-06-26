//! Creating token and saving it in Cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  //? options for Cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), //? Here "COOKIE_EXPIRE" are the days of expiring the cookie
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
