const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { authenticate } = require('../../middlewares');

router.get('/', authenticate, ctrl.getContacts);

router.get('/:contactId', authenticate, ctrl.getById);

router.delete('/:contactId', ctrl.removeById);

router.post('/', authenticate, ctrl.addNew);

router.put('/:contactId', ctrl.updateById);

router.patch('/:contactId/favorite', ctrl.patchFavById);

module.exports = router;
