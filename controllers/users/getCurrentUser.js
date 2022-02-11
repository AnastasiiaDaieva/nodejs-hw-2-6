const { User } = require('../../models/user');

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {
    token: '',
  });
  res.status(204).send();
};

module.exports = getCurrentUser;
