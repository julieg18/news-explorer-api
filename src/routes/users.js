const express = require('express');
const { checkUserAuthorization } = require('../middleware/auth');
const { getLoggedInUser } = require('../controllers/users');

const router = express.Router();

router.get('/me', checkUserAuthorization, getLoggedInUser);

module.exports = router;
