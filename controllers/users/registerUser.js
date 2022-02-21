const bcryptjs = require('bcryptjs');
const { User, schemas } = require('../../models/user');
const CreateError = require('http-errors');

const gravatar = require('gravatar');

const registerUser = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new CreateError(409, 'Email in use');
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const avatarURL = gravatar.url(email);

    await User.create({ avatarURL, email, password: hashPassword });

    res.status(201).json({ user: { email } });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
