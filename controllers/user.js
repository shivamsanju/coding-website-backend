const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Questions = require('../models/questionModel');
const jwt = require('jsonwebtoken');
const questions = require('../data/questions');

const sendToken = catchAsyncErrors(async (user, statusCode, res) => {
  const token = await jwt.sign(
    { userId: user.userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

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
    res.status(401).send({ success: false, message: 'Invalid Credentials' });
  } else if (password !== user.password) {
    res.status(401).send({ success: false, message: 'Invalid Credentials' });
  } else {
    sendToken(user, 200, res);
  }
};

//Signup User
exports.signUpUser = async (req, res, next) => {
  const { username, password, confPassword } = req.body;
  if (password != confPassword) {
    res
      .status(400)
      .send({ success: false, message: 'Passwords does not match' });
    return;
  }
  try {
    newUser = { username: username, password: password };
    addedUser = await User.create(newUser);
    await Promise.all(
      questions.map(async (question) => {
        let newques = { ...question, userId: addedUser.userId, done: false };
        await Questions.create(newques);
      })
    );
    sendToken(newUser, 200, res);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ success: false, message: 'User with same name already exists' });
  }
};
