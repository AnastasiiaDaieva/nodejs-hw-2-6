const registerUser = require('./registerUser');
const getCurrentUser = require('./getCurrentUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const patchSubById = require('./patchSubscriptionById');
const patchAvatar = require('./patchAvatar');
const verifyUser = require('./verifyUser');
const resendVerification = require('./resendVerification');

module.exports = {
  registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  patchSubById,
  patchAvatar,
  verifyUser,
  resendVerification,
};
