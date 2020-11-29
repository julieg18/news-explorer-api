const ValidationError = require('../errors/ValidationError');
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

module.exports = { validateArticleData };
