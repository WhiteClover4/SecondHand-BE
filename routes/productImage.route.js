const express                = require('express');
const router                 = express.Router();
const productImageRoutes     = require('../controllers/productImage.controller');
const imageUpload = require('../misc/multer');

router.get('/', productImageRoutes.getAllProductImages);
router.get('/:id', productImageRoutes.getProductImageById);
router.post('/',  imageUpload.array('photo', 5), productImageRoutes.createProductImage);
router.put('/:id',  productImageRoutes.updateProductImage);
router.delete('/:id',  productImageRoutes.deleteProductImage);

module.exports = router;