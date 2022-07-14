const { ProductImage }             = require('../models');
const { uploadMultiCloudinary } = require('../misc/cloudinary');

const createProductImage = async (req, res) => {
    try {
        // Add ke tabel product image
        if(req.files) { 
            await uploadMultiCloudinary(req.files, req.params.id);
        };
        res.status(201).json({
            status: 'success',
            msg: 'Gambar produk berhasil ditambahkan',
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: error.message
        })
    }
}

const deleteProductImage = async (req, res) => {
  try{
      const deletedProductImage = await ProductImage.destroy({
          where: {
              id: req.params.id
          }
      });
      if (!deletedProductImage) {
        return res.status(404).json({
          msg: `ProductImage dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          msg: 'Gambar produk berhasil dihapus'
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.msg
    })
  }
}

module.exports = {
  createProductImage,
  deleteProductImage
}