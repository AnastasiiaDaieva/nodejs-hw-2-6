const { User } = require('../../models/user');
const CreateError = require('http-errors');
const { NOT_FOUND } = require('../../static-variables/status');
const { sendEmail } = require('../../helpers');

const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne(verificationToken);
    if (!user) {
      throw CreateError(NOT_FOUND.code, NOT_FOUND.message);
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.json({ message: 'Verification is successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
