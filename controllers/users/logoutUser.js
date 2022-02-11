const logoutUser = async (req, res, next) => {
  res.json({ email: req.user.email });
};

module.exports = logoutUser;
