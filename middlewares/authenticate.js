const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../models/user');
const status = require('../static-variables/status');

const { UNATHORIZED } = status;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new CreateError(UNATHORIZED.code, UNATHORIZED.message);
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new CreateError(UNATHORIZED.code, UNATHORIZED.message);
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = UNATHORIZED.code;
      error.message = UNATHORIZED.message;
    }
    next(error);
  }
};

module.exports = authenticate;
