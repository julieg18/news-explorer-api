const express = require('express');
const { validateSignupUserData } = require('../middleware/users');
const { signupUser } = require('../controllers/users');

const router = express.Router();

router.post('/signup', validateSignupUserData, signupUser);

module.exports = router;
