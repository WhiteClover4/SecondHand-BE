const express        = require('express');
const router         = express.Router();
const productRoutes     = require('../controllers/product.controller');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', productRoutes.getAllProducts);
router.get('/:id', productRoutes.getProductById);
router.post('/', createValidationFor("create-product"), checkValidationResult, productRoutes.createProduct);
router.put('/:id', createValidationFor("update-product"), checkValidationResult,  productRoutes.updateProduct);
router.delete('/:id',  productRoutes.deleteProduct);

module.exports = router;