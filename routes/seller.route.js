const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/product.controller');
const productImageController = require('../controllers/productImage.controller');
const { authenticate }      = require('../misc/passport')
const imageUpload       = require('../misc/multer');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', authenticate, productController.getSellerProduct);
router.get('/product/:id', authenticate, productController.getProductById);
router.put('/product/:id', authenticate, productController.updateProduct);
router.post('/product/image/:id', imageUpload.array('product_pictures', 4), authenticate, productImageController.createProductImage);
router.delete('/product/image/:id', authenticate, productImageController.deleteProductImage);
router.post('/product/preview', imageUpload.array('product_pictures', 4), createValidationFor('update-seller/product/preview'), checkValidationResult, authenticate, productController.createPreviewProduct);
router.post('/product/publish', imageUpload.array('product_pictures', 4), createValidationFor('update-seller/product/publish'), checkValidationResult, authenticate, productController.createPublishProduct);
router.post('/product/publish/:id', authenticate, productController.publishProduct);

module.exports = router;