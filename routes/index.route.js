const express          = require('express');
const router           = express.Router();
const userRoutes       = require('./user.route');
const authController   = require('../controllers/auth.controller');
const { createValidationFor, checkValidationResult } = require('../misc/validator');


router.post('/register', createValidationFor('register'), checkValidationResult, authController.register);
router.post('/login', createValidationFor("login"), checkValidationResult, authController.login);
router.post('/send-email', authController.sendToEmail);
router.post('/forget-password', createValidationFor('forget-password'), checkValidationResult, authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
router.use('/user', userRoutes);

module.exports = router;