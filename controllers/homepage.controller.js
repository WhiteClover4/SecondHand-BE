const {Product, ProductImage} = require("../models");
const { Op } = require("sequelize");

const homepage = async (req, res) => {
    try {
        const {q, category} = req.query;
        
        const options = {
            where: {
                status: {
                    [Op.not]: "COMPLETED"
                },
                isPublished: true
            },
            include: [ProductImage]
        }

        if(category && q) {
            options.where = {
                name: {
                    [Op.iLike]: `%${q}%`
                },
                category: category
            };
        } else if (category) {
            options.where = {
                category: category
            };
        } else if (q) {
            options.where = {
                name: {
                    [Op.iLike]: `%${q}%`
                }
            };
        }

        const products = await Product.findAll(options);
        console.log(products);
        const result = products.map((eachProduct) => {
            return {
                id: eachProduct.id,
                name: eachProduct.name,
                description: eachProduct.description,
                price: eachProduct.price,
                status: eachProduct.status,
                category: eachProduct.category,
                isPublished: eachProduct.isPublished,
                ProductImage: eachProduct.ProductImages[0].product_pictures
            }
          })

        return res.status(200).json({
            status  : 'success',
            msg     : 'homepage',
            data    : result 
        });
    } catch (err) {
        return res.status(500).json({
            status  : 'error',
            msg     : err.message
          }) 
    }
};

module.exports = homepage;