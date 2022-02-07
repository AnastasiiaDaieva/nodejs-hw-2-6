const { Contact } = require('../../models/contact');
const CreateError = require('http-errors');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    if (error.message.toLowerCase().includes('cast to objectid failed')) {
      error.status = 404;
    }
    next(error);
  }
};

module.exports = getById;
