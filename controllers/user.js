const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const sendToken = catchAsyncErrors(async (user, statusCode, res) => {
  const token = await jwt.sign({ userId: user.userId}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
});


//Login User
exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      res.status(401).send({"success": false, "message":"unauthorized"});
    }
    console.log(user.password,password)
    if (password !== user.password) {
      res.status(401).send({"success": false, "message":"unauthorized"});
    } else {
      sendToken(user, 200, res);
    }
  };