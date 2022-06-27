const { Product } = require('../models');

const getAllProducts = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'name', 'description', 'price', 'status', 'category_id', 'isPublished'],
        };
        
        if(req.query) {
            let { page, row } = req.query;
    
            let pages = ((page - 1) * row);
    
    
            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }

        const allProducts = await Product.findAll(options);

        res.status(200).json({
            status: 'success',
            message: 'Semua produk ditampilkan', 
            data: allProducts,
        });
    } catch (err) {
        return res.status(500).json({
          status: 'error',
          message: err.message
        }) 
    }
}

const getProductById = async (req, res) => {
    const foundProduct = await Product.findByPk(req.params.id);

    if (!foundProduct) {
        return res.status(404).json({
          message: `Product dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Produk Ditemukan',
        data: foundProduct
    })
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, status, category_id, isPublished } = req.body;
    
        const createdProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            status: status,
            category_id: category_id,
            isPublished: isPublished
        });
        res.status(201).json({
            status: 'success',
            message: 'Produk berhasil ditambahkan',
            data: createdProduct
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          message: err.message
        })
    }
}

const updateProduct = async (req, res) => {
  try{
      const { name, description, price, status, category_id, isPublished } = req.body;
    
      const updatedProduct = await Product.update({
            name:name,
            description:description,
            price:price,
            status:status,
            category_id:category_id,
            isPublished:isPublished
      }, {
        where: {
          id: req.params.id
        }, returning: true 
      });
      if (!updatedProduct[0]) {
        return res.status(404).json({
          message: `Product dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          message: 'Produk berhasil diubah',
          data: updatedProduct[1]
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try{
      const deletedProduct = await Product.destroy({
          where: {
              id: req.params.id
          }
      });
      if (!deletedProduct) {
        return res.status(404).json({
          message: `Product dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          message: 'Produk berhasil dihapus'
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}