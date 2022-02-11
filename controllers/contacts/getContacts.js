const { Contact } = require('../../models/contact');

const getContacts = async (req, res, next) => {
  try {
    console.log(req.query);
    const { page = 1, limit = 20, favorite = true } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const data = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
      skip,
      limit: +limit,
    }).populate('owner', 'email');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
