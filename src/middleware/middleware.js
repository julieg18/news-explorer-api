const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

function checkUserAuthorization(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthorizationError('Authorization required');
    }

    try {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.user = payload;
    } catch (err) {
      throw new AuthorizationError('Authorization required');
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkUserAuthorization };
