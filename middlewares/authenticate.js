const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../models/user');

const NUMBER_ERROR = 401;
const UNATHORIZED_MESSAGE = 'Unauthorized';

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new CreateError(NUMBER_ERROR, UNATHORIZED_MESSAGE);
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new CreateError(NUMBER_ERROR, UNATHORIZED_MESSAGE);
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = NUMBER_ERROR;
      error.message = UNATHORIZED_MESSAGE;
    }
    next(error);
  }
};

module.exports = authenticate;
