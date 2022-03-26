const express = require('express');

const router = express.Router();

const path = require('path');

const ctrl = require('../../controllers/users');

const { authenticate, upload } = require('../../middlewares');

router.post('/signup', ctrl.registerUser);

router.post('/login', ctrl.loginUser);

router.get('/logout', authenticate, ctrl.getCurrentUser);

router.get('/current', authenticate, ctrl.logoutUser);

router.get('/verify/:verificationToken', authenticate, ctrl.verifyUser);
router.post('/verify', authenticate, ctrl.resendVerification);

router.patch('/subscription', authenticate, ctrl.patchSubById);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.patchAvatar,
);

module.exports = router;
