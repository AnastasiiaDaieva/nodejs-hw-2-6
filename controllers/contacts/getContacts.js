const { Contact } = require('../../models/contact');

const getContacts = async (req, res, next) => {
  try {
    const data = await Contact.find({}, '-createdAt -updatedAt');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
