const { User, schemas } = require('../../models/user');
const CreateError = require('http-errors');

const patchSubById = async (req, res, next) => {
  try {
    const { error } = schemas.patchSub.validate(req.body);
    if (error) {
      throw new CreateError(400, {
        message: 'The accepted subscription options: starter, pro, business',
      });
    }
    const { _id, subscription } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: subscription,
    });

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

module.exports = patchSubById;
