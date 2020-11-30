const express = require('express');
const { checkUserAuthorization } = require('../middleware/middleware');
const {
  validateSignupUserData,
  checkIfUserEmailIsInUse,
} = require('../middleware/users');
const {
  signupUser,
  loginUser,
  getLoggedInUser,
} = require('../controllers/users');

const router = express.Router();

router.post(
  '/signup',
  validateSignupUserData,
  checkIfUserEmailIsInUse,
  signupUser,
);
router.post('/signin', loginUser);
router.get('/me', checkUserAuthorization, getLoggedInUser);

module.exports = router;
