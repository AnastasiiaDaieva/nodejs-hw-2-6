const { Contact } = require('../../models/contact');

const updateStatusContact = async (id, body) =>
  await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

module.exports = updateStatusContact;
