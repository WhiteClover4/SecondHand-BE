const { ProductImage }             = require('../models');


const getAllProductImages = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'product_id', 'product_pictures' ],
        };

        if(req.query) {
            let { page, row } = req.query;
    
            let pages = ((page - 1) * row);
    
    
            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }


        const allProductImages = await ProductImage.findAll(options);

        return res.status(200).json({
            status: 'success',
            msg: 'Semua gambar ditampilkan',
            data: allProductImages,
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: error.message
        }) 
    }
}

const getProductImageById = async (req, res) => {
    const foundProductImage = await ProductImage.findByPk(req.params.id);

    if (!foundProductImage) {
        return res.status(404).json({
          msg: `ProductImage dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        msg: 'Gambar produk ditemukan',
        data: foundProductImage
    })
}

const createProductImage = async (req, res) => {
    try {
        const { product_id, product_pictures } = req.body;
    
        const createdProductImage = await ProductImage.create({
            product_id: product_id,
            product_pictures: product_pictures
        });
        res.status(201).json({
            status: 'success',
            msg: 'Gambar produk berhasil ditambahkan',
            data: createdProductImage
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: error.message
        })
    }
}

const updateProductImage = async (req, res) => {
  try{
      const { product_id, product_pictures } = req.body;
    
      const updatedProductImage = await ProductImage.update({
            product_id: product_id,
            product_pictures: product_pictures
      }, {
        where: {
          id: req.params.id
        }, returning: true  
      });
      if (!updatedProductImage[0]) {
        return res.status(404).json({
          msg: `ProductImage dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          msg: 'Produk berhasil diubah',
          data: updatedProductImage[1]
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.msg
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
  getAllProductImages,
  getProductImageById,
  createProductImage,
  updateProductImage,
  deleteProductImage
}