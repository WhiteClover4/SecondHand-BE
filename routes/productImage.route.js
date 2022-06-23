const express                = require('express');
const router                 = express.Router();
const productImageRoutes     = require('../controllers/productImage.controller');

router.get('/', productImageRoutes.getAllProductImages);
router.get('/:id', productImageRoutes.getProductImageById);
router.post('/',  productImageRoutes.createProductImage);
router.put('/:id',  productImageRoutes.updateProductImage);
router.delete('/:id',  productImageRoutes.deleteProductImage);

module.exports = router;