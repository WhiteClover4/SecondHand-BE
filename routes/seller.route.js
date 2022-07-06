const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/product.controller');
const productImageController = require('../controllers/productImage.controller');
const userChecking      = require('../misc/passport')
const imageUpload       = require('../misc/multer');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', userChecking, productController.getSellerProduct);
router.get('/product/:id', userChecking, productController.getProductById);
// PUT product/:id
router.put('/product/:id', userChecking, productController.updateProduct);
// POST product/image
router.post('/product/image/:id', imageUpload.array('product_pictures', 4), userChecking, productImageController.createProductImage);
// DELETE product/image/:id
router.delete('/product/image/:id', userChecking, productImageController.deleteProductImage);
router.post('/product/preview', imageUpload.array('product_pictures', 4), createValidationFor('update-seller/product/preview'), checkValidationResult, userChecking, productController.createPreviewProduct);
router.post('/product/publish', imageUpload.array('product_pictures', 4), createValidationFor('update-seller/product/publish'), checkValidationResult, userChecking, productController.createPublishProduct);
router.post('/product/publish/:id', userChecking, productController.publishProduct);

module.exports = router;