const express = require('express');
const { checkUserAuthorization } = require('../middleware/middleware');
const { validateArticleData } = require('../middleware/articles');
const { createArticle } = require('../controllers/articles');

const router = express.Router();

router.post('/', checkUserAuthorization, validateArticleData, createArticle);

module.exports = router;
