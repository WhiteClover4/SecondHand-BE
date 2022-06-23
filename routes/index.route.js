const express          = require('express');
const router           = express.Router();
const userRoutes       = require('./user.route');
const productRoutes    = require('./product.route');
const authController   = require('../controllers/auth.controller');
const { createValidationFor, checkValidationResult } = require('../misc/validator');


router.get('/', (req, res) => {
    res.send("Hello World");
});

router.post('/register', createValidationFor('register'), checkValidationResult, authController.register);
router.post('/login', createValidationFor("login"), checkValidationResult, authController.login);
router.post('/send-email', authController.sendToEmail);
router.post('/forget-password', createValidationFor('forget-password'), checkValidationResult, authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
router.use('/user', userRoutes);
router.use('/product', productRoutes);

module.exports = router;