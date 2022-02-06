const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getContacts);

router.get('/:contactId', ctrl.getById);

router.delete('/:contactId', ctrl.removeById);

router.post('/', ctrl.addNew);

router.put('/:contactId', ctrl.updateById);

router.patch('/:contactId/favorite', ctrl.patchById);

module.exports = router;
