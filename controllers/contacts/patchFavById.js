const { schemas } = require('../../models/contact');
const CreateError = require('http-errors');
const updateStatusContact = require('./updateStatusContact');

const patchFavById = async (req, res, next) => {
  try {
    const { error } = schemas.patchFav.validate(req.body);
    if (error) {
      throw new CreateError(400, { message: 'missing field favorite' });
    }

    const { contactId } = req.params;

    const result = await updateStatusContact(contactId, req.body);

    if (!result) {
      throw new CreateError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    if (error.message.toLowerCase().includes('cast to objectid failed')) {
      error.status = 404;
      error.message = 'Not Found';
    }
    next(error);
  }
};

module.exports = patchFavById;
