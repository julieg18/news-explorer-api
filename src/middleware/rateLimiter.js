const rateLimit = require('express-rate-limit');
const {
  resMessages: { rateLimitHasExceeded },
} = require('../utils/constants');

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  message: rateLimitHasExceeded,
  headers: true,
});

module.exports = rateLimiterUsingThirdParty;
