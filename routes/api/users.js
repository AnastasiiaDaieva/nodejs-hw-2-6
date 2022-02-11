const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/users');

const { authenticate } = require('../../middlewares');

router.post('/signup', ctrl.registerUser);

router.post('/login', ctrl.loginUser);

router.get('/logout', authenticate, ctrl.getCurrentUser);

router.get('/current', authenticate, ctrl.logoutUser);

router.patch('/subscription', authenticate, ctrl.patchSubById);

module.exports = router;
