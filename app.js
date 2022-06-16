const express = require('express');
const cors = require('cors');
const path = require('path');
console.log(
  require('dotenv').config({ path: path.resolve(__dirname, 'config.env') })
);
const session = require('express-session');

var sess = {
  saveUninitialized: false,
  resave: false,
  secret: 'very secret 12345',
  cookie: {
    sameSite: 'none',
    secure: true,
  },
};

const app = express();

//Database connection test
const testConnection = require('./config/testConn');
testConnection();

// json parser
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'https://shvm-leetcode-frontend.herokuapp.com',
      'http://localhost:3000',
      'https://leetcodeproblems.netlify.app/',
    ],
  })
);

app.use(session(sess));

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://shvm-leetcode-frontend.herokuapp.com',
    'https://leetcodeproblems.netlify.app/',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Accept, Content-Type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH'
  );
  next();
});

app.listen(process.env.PORT || 8000, (res, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server started');
  }
});

//routes
const user = require('./routes/user.routes');
const questions = require('./routes/question.routes');
app.use('/api', user);
app.use('/api', questions);
