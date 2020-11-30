const Article = require('../models/Article');

function createArticle(req, res, next) {
  const { keyword, title, text, date, source, link, image } = req.body;
  const { userId } = req.user;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: userId,
  })
    .then((article) => {
      res.status(201).send({ message: 'Article created', article });
    })
    .catch(next);
}

function getLoggedInUsersArticles(req, res, next) {
  const { userId } = req.user;
  Article.find({ owner: userId })
    .then((articles) => {
      res.send({ message: 'Articles found', articles });
    })
    .catch(next);
}

function deleteArticle(req, res, next) {
  const { articleId } = req.params;
  Article.findByIdAndDelete(articleId)
    .then((article) => {
      res.send({ message: 'Article deleted', article });
    })
    .catch(next);
}

module.exports = { createArticle, getLoggedInUsersArticles, deleteArticle };
