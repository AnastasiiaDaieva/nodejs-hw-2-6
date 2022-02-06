const { Contact } = require('../../models/contact');
const CreateError = require('http-errors');

const removebyId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json({ message: `Contact '${result.name}' was deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = removebyId;
