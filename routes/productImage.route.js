const express                = require('express');
const router                 = express.Router();
const productImageRoutes     = require('../controllers/productImage.controller');
const imageUpload = require('../misc/multer');

router.post('/',  imageUpload.array('photo', 5), productImageRoutes.createProductImage);
router.delete('/:id',  productImageRoutes.deleteProductImage);

module.exports = router;