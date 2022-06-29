const {Product, Category, ProductImage} = require("../models");
const { Op } = require("sequelize");

const homepage = async (req, res) => {
    try {
        const {q, category} = req.query;
        
        const options = {
            include: [Category, ProductImage]
        }

        let categoryId;
        if(category) {
            categoryId = await Category.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${category}%`
                    }
                }
            });
        }

        if(category && q) {
            options.where = {
                name: {
                    [Op.iLike]: `%${q}%`
                },
                category_id: categoryId.id
            };
        } else if (category) {
            options.where = {
                category_id: categoryId.id
            };
        } else if (q) {
            options.where = {
                name: {
                    [Op.iLike]: `%${q}%`
                }
            };
        }

        const result = await Product.findAll(options);

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