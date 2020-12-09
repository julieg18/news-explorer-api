const ValidationError = require('../errors/ValidationError');
const AuthorizationError = require('../errors/AuthorizationError');
const Article = require('../models/Article');
const {
  errMessages: {
    articleValidationFailed,
    articleIdNotValid,
    userDoesNotHaveArticleAccess,
  },
} = require('../utils/constants');

function validateArticleData(req, res, next) {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.validate({ keyword, title, text, date, source, link, image }, [
    'keyword',
    'title',
    'text',
    'date',
    'source',
    'link',
    'image',
  ])
    .then(() => {
      next();
    })
    .catch((err) => {
      next(
        err.name === 'ValidationError'
          ? new ValidationError(articleValidationFailed)
          : err,
      );
    });
}

function validateArticleId(req, res, next) {
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new ValidationError(articleIdNotValid);
      }
      next();
    })
    .catch((err) => {
      next(
        err.name === 'CastError' ? new ValidationError(articleIdNotValid) : err,
      );
    });
}

function checkArticleAccess(req, res, next) {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select('+owner')
    .then(({ owner }) => {
      if (owner.toString() !== req.user.userId) {
        throw new AuthorizationError(userDoesNotHaveArticleAccess);
      }
      next();
    })
    .catch(next);
}

module.exports = {
  validateArticleData,
  validateArticleId,
  checkArticleAccess,
};
