const express        = require('express');
const router         = express.Router();
const productRoutes     = require('../controllers/product.controller');
const { optionalAuthenticate } = require('../misc/passport');

router.get('/:id', optionalAuthenticate, productRoutes.getProductById);

module.exports = router;