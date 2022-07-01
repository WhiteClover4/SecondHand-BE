const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/product.controller');
const userChecking      = require('../misc/passport')
const imageUpload       = require('../misc/multer');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', userChecking, productController.getSellerProduct);
router.post('/product/preview', imageUpload.array('product_pictures', 4), userChecking, productController.createPreviewProduct);
router.post('/product/publish', imageUpload.array('product_pictures', 4), userChecking, productController.createPublishProduct);
router.post('/product/publish/:id', userChecking, productController.publishProduct);

module.exports = router;