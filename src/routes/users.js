const express = require('express');
const { checkUserAuthorization } = require('../middleware/middleware');
const { validateSignupUserData } = require('../middleware/users');
const {
  signupUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/users');

const router = express.Router();

router.post('/signup', validateSignupUserData, signupUser);
router.post('/signin', loginUser);
router.get('/me', checkUserAuthorization, getCurrentUser);

module.exports = router;
