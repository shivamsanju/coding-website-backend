const express = require('express');
const { loginUser, signUpUser } = require('../controllers/user');

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/signup').post(signUpUser);

module.exports = router;
