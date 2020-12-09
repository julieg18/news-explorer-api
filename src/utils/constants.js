const errMessages = {
  articleValidationFailed: 'Article validation failed',
  articleIdNotValid: 'Article id is not valid',
  userDoesNotHaveArticleAccess: 'User does not have access to article',
  authorizationRequired: 'Authorization required',
  userValidationFailed: 'User validation failed',
  userEmailAlreadyInUse: 'Email is already in use',
  incorrectEmailOrPassword: 'Incorrect email or password',
  resourceNotFound: 'Requested resource not found',
};

const resMessages = {
  articleCreated: 'Article created',
  articlesFound: 'Articles found',
  articleDeleted: 'Article deleted',
  loginSuccessful: 'Login successful',
  userFound: 'User found',
  rateLimitHasExceeded: 'You have exceeded the 100 requests in 24 hrs limit',
};

module.exports = { errMessages, resMessages };
