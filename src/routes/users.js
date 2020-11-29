const express = require('express');
const { validateSignupUserData } = require('../middleware/users');
const { signupUser, loginUser } = require('../controllers/users');

const router = express.Router();

router.post('/signup', validateSignupUserData, signupUser);
router.post('/signin', loginUser);

module.exports = router;
