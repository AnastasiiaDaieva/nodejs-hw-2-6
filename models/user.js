const Joi = require('joi');

const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: { type: String },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verification token is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

const signupJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({ email: Joi.string().required() });

const patchSubscriptionJoiSchema = Joi.object({ subscription: Joi.string() });

const schemas = {
  signup: signupJoiSchema,
  patchSub: patchSubscriptionJoiSchema,
  verify: verifyEmailSchema,
};

module.exports = { User, schemas };
