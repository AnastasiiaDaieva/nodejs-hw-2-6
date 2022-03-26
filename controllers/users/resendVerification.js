const Joi = require('joi');
const { User, schemas } = require('../../models/user');
const CreateError = require('http-errors');
const { sendEmail } = require('../../helpers');
const mail = require('@sendgrid/mail');
const {
  VERIFICATION_SENT,
  VERIFIED_ERROR,
} = require('../../static-variables/status');

const resendVerification = async (req, res, next) => {
  try {
    const { error } = schemas.verify.validate(req.body);
    if (error) {
      throw CreateError(400, 'missing required email field');
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.verify) {
      throw CreateError(VERIFIED_ERROR.code, VERIFIED_ERROR.message);
    }
    const mail = {
      to: email,
      subject: 'Email verification',
      html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Click to verify your email </a>`,
    };
    await sendEmail(mail);
    res.json({ message: VERIFICATION_SENT.message });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerification;
