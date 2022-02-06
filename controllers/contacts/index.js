const getContacts = require('./getContacts');
const getById = require('./getById');
const updateById = require('./updateById');
const removeById = require('./removeById');
const addNew = require('./addNew');
const patchById = require('./patchById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getContacts,
  getById,
  updateById,
  removeById,
  addNew,
  patchById,
  updateStatusContact,
};
