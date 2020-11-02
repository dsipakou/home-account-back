const { User } = require('../models/UserModel');

const auth = (request, response, next) => {
  let token = request.cookies.authToken;

  User.findByToken(token, (error, user) => {
    if (error) {
      throw error;
    }
    if (!user) {
      return response.json({ isAuth: false, error: true });
    }
    request.token = token;
    request.user = user;
    next();
  });
}

module.exports = auth
