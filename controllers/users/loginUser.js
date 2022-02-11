const bcryptjs = require('bcryptjs');
const { User, schemas } = require('../../models/user');
const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const compareResult = await bcryptjs.compare(password, user.password);

    if (!user || !compareResult) {
      throw new CreateError(401, 'Unauthorized');
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({ token, user: { email } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
