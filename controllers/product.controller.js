const { Product, Transaction, Category, User, ProductImage } = require('../models');
const {uploadMultiCloudinary} = require('../misc/cloudinary');

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
            msg: 'Semua produk ditampilkan', 
            data: allProducts,
        });
    } catch (err) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        }) 
    }
}

const getProductById = async (req, res) => {
    const foundProduct = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: [Category, {model: Transaction, include: [{model: User, as: 'seller'}]}]
    });

    if (!foundProduct) {
        return res.status(404).json({
          msg: `Product dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        msg: 'Produk Ditemukan',
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
            msg: 'Produk berhasil ditambahkan',
            data: createdProduct
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
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
          msg: `Product dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          msg: 'Produk berhasil diubah',
          data: updatedProduct[1]
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.message
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
          msg: `Product dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          msg: 'Produk berhasil dihapus'
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const getSellerProduct = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'name', 'description', 'price', 'status', 'category_id', 'isPublished'],
            include: [Category, ProductImage, {model: Transaction, where: {seller_id: req.user.id}}]
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
            msg: 'Semua produk ditampilkan', 
            data: allProducts,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const createPreviewProduct = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;
    
        const createdProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            status: "DRAFT",
            category_id: category_id,
            isPublished: false
        });

        await uploadMultiCloudinary(req.files, createdProduct.id);
        const result = await Product.findOne({
            where: {
                id: createdProduct.id
            },
            include: [ProductImage]
        });
        res.status(201).json({
            status: 'success',
            msg: 'Produk berhasil ditambahkan',
            data: result
        });
    } catch (err) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

const createPublishProduct = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;
    
        const createdProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            status: "DRAFT",
            category_id: category_id,
            isPublished: true
        });
        await uploadMultiCloudinary(req.files, createdProduct.id);
        const result = await Product.findOne({
            where: {
                id: createdProduct.id
            },
            include: [ProductImage]
        });
        res.status(201).json({
            status: 'success',
            msg: 'Produk berhasil dipublish',
            data: result
        });
    } catch (err) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

const publishProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.update({
            isPublished: true
        },{
            where: {
                id: req.params.id
            }, returning: true
        });
        res.status(201).json({
            status: 'success',
            msg: 'Produk berhasil dipublish',
            data: updatedProduct[1]
        });
    } catch (err) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getSellerProduct,
    createPreviewProduct,
    createPublishProduct,
    publishProduct
}