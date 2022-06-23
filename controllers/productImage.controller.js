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
            result: allProductImages,
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          message: error.message
        }) 
    }
}

const getProductImageById = async (req, res) => {
    const foundProductImage = await ProductImage.findByPk(req.params.id);

    if (!foundProductImage) {
        return res.status(404).json({
          message: `ProductImage dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundProductImage
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
            result: createdProductImage
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          message: error.message
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
          message: `ProductImage dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          result: updatedProductImage[1]
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      message: err.message
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
          message: `ProductImage dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          message: 'Yosha'
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      message: err.message
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