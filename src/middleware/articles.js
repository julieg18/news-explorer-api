const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');
const Article = require('../models/Article');

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
          ? new ValidationError('Article validation failed')
          : err,
      );
    });
}

function validateArticleId(req, res, next) {
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article not found');
      }
      next();
    })
    .catch((err) => {
      next(
        err.name === 'CastError' ? new NotFoundError('Article not found') : err,
      );
    });
}

function checkArticleAccess(req, res, next) {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select('+owner')
    .then(({ owner }) => {
      if (owner.toString() !== req.user.userId) {
        throw new AuthorizationError('User does not have access to article');
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
