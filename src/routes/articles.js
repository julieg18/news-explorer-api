const express = require('express');
const { checkUserAuthorization } = require('../middleware/auth');
const {
  validateArticleId,
  checkIfArticleIdIsFound,
  checkArticleAccess,
  validateArticleData,
} = require('../middleware/articles');
const {
  createArticle,
  getLoggedInUsersArticles,
  deleteArticle,
} = require('../controllers/articles');

const router = express.Router();

router.post('/', checkUserAuthorization, validateArticleData, createArticle);
router.get('/', checkUserAuthorization, getLoggedInUsersArticles);
router.delete(
  '/:articleId',
  checkUserAuthorization,
  validateArticleId,
  checkIfArticleIdIsFound,
  checkArticleAccess,
  deleteArticle,
);

module.exports = router;
