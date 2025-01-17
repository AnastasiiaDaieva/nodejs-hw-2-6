const registerUser = require('./registerUser');
const getCurrentUser = require('./getCurrentUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const patchSubById = require('./patchSubscriptionById');
const patchAvatar = require('./patchAvatar');

module.exports = {
  registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  patchSubById,
  patchAvatar,
};
