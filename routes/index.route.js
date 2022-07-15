const express               = require('express');
const router                = express.Router();
const userRoutes            = require('./user.route');
const productRoutes         = require('./product.route');
const productImageRoutes    = require('./productImage.route');
const transactionRoutes     = require('./transaction.route');
const notificationRoutes    = require('./notification.route');
const sellerRoutes          = require('./seller.route');
const authController        = require('../controllers/auth.controller');
const homepageController    = require('../controllers/homepage.controller');
const { createValidationFor, checkValidationResult } = require('../misc/validator');


router.get('/', homepageController);

router.post('/register', createValidationFor('register'), checkValidationResult, authController.register);
router.post('/login', createValidationFor("login"), checkValidationResult, authController.login);
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/seller', sellerRoutes);
router.use('/productImage', productImageRoutes);
router.use('/transaction', transactionRoutes);
router.use('/notification', notificationRoutes);



module.exports = router;