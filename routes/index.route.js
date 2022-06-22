const express          = require('express');
const router           = express.Router();
const userRoutes       = require('./user.route');
const productRoutes    = require('./product.route');

router.use('/user', userRoutes);
router.use('/product', productRoutes);

module.exports = router;