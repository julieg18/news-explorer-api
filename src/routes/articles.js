const express = require('express');
const { checkUserAuthorization } = require('../middleware/middleware');
const { validateArticleData } = require('../middleware/articles');
const {
  createArticle,
  getLoggedInUsersArticles,
} = require('../controllers/articles');

const router = express.Router();

router.post('/', checkUserAuthorization, validateArticleData, createArticle);
router.get('/', checkUserAuthorization, getLoggedInUsersArticles);

module.exports = router;
