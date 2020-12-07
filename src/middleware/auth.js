const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const {
  errMessages: { authorizationRequired },
} = require('../utils/constants');

function checkUserAuthorization(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthorizationError(authorizationRequired);
    }

    try {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(
        token,
        process.env.NODE_ENV === 'production'
          ? process.env.JWT_KEY
          : 'secret-key',
      );
      req.user = payload;
    } catch (err) {
      throw new AuthorizationError(authorizationRequired);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkUserAuthorization };
