const { Transaction, Product, User, ProductImage, Notification } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

const getAllTransactions = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'seller_id', 'buyer_id', 'product_id', 'offer_price', 'status'],
        };

        if (req.query) {
            let { page, row } = req.query;

            let pages = ((page - 1) * row);


            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }

        const allTransactions = await Transaction.findAll(options);

        res.status(200).json({
            status: 'success',
            msg: 'Semua Transaction ditampilkan',
            data: allTransactions,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

// const getTransactionById = async (req, res) => {
//     const foundTransaction = await Transaction.findByPk(req.params.id);

//     if (!foundTransaction) {
//         return res.status(404).json({
//             msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         msg: 'Transaction Ditemukan',
//         data: foundTransaction
//     })
// }

const createTransaction = async (req, res) => {
    try {
        const { seller_id, buyer_id, product_id, offer_price } = req.body;

        const createdTransaction = await Transaction.create({
            seller_id: seller_id,
            buyer_id: buyer_id,
            product_id: product_id,
            offer_price: offer_price,
            status: null
        });
        res.status(201).json({
            status: 'success',
            msg: 'Transaction berhasil ditambahkan',
            data: createdTransaction
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const { offer_price } = req.body;

        const foundProduct = await Product.findOne({
            where: {
                id: req.params.id
            },
            include: [Transaction]
        });

        const foundTransaction = await Transaction.findOne({
            where: {
                buyer_id: req.user.id,
                product_id: req.params.id
            }
        });

        if (!foundTransaction) {
            const createTransactionOffering = await Transaction.create({
                seller_id: foundProduct.Transactions[0].seller_id,
                buyer_id: req.user.id,
                product_id: req.params.id,
                offer_price: offer_price,
                status: "OFFERED"
            });

            await Notification.create({
                transaction_id: createTransactionOffering.id,
                user_id: createTransactionOffering.seller_id,
                message: "Penawaran produk",
                role: "seller"
            });

            await Notification.create({
                transaction_id: createTransactionOffering.id,
                user_id: createTransactionOffering.buyer_id,
                message: "Penawaran produk",
                role: "buyer"
            });

            res.status(200).json({
                status: 'success',
                msg: 'Harga tawarmu berhasil dikirim ke penjual',
                data: createTransactionOffering
            });
        } else {
            return res.status(422).json({
                status: 'Error',
                msg: "Anda sudah menawarkan produk ini, tunggu respon dari penjual"
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }
        res.status(200).json({
            status: 'success',
            msg: 'Transaction berhasil dihapus'
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const getAllWishlist = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'name', 'description', 'price', 'status', 'category', 'isPublished'],
            include: [ProductImage, {model: Transaction, where: {seller_id: req.user.id, status: "OFFERED"}, include: [{model: User, as: 'seller'}]}]
        };

        if (req.query) {
            let { page, row } = req.query;

            let pages = ((page - 1) * row);


            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }

        const allWishlist = await Product.findAll(options);

        const result = allWishlist.map((eachWishlist) => {
            return {
                id: eachWishlist.id,
                transaction_id: eachWishlist.Transactions[0].id,
                name: eachWishlist.name,
                description: eachWishlist.description,
                price: eachWishlist.price,
                status: eachWishlist.status,
                category: eachWishlist.category,
                isPublished: eachWishlist.isPublished,
                ProductImage: eachWishlist.ProductImages[0].product_pictures
            }
          })

        res.status(200).json({
            status: 'success',
            msg: 'Semua Transaction ditampilkan',
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
};

const getHistoryTransaction = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'name', 'description', 'price', 'status', 'category', 'isPublished'],
            where: {
                [Op.or]: [
                    { status: "CANCELED" },
                    { status: "COMPLETED" },
                ]
            },
            include: [ProductImage, {model: Transaction, where: {seller_id: req.user.id}, include: [{model: User, as: 'seller'}]}]
        };

        if (req.query) {
            let { page, row } = req.query;

            let pages = ((page - 1) * row);


            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }

        const allHistory = await Product.findAll(options);

        const result = allHistory.map((eachHistory) => {
            return {
                id: eachHistory.id,
                transaction_id: eachHistory.Transactions[0].id,
                name: eachHistory.name,
                description: eachHistory.description,
                price: eachHistory.price,
                status: eachHistory.status,
                category: eachHistory.category,
                isPublished: eachHistory.isPublished,
                ProductImage: eachHistory.ProductImages[0].product_pictures
            }
          })

        res.status(200).json({
            status: 'success',
            msg: 'Semua Transaction ditampilkan',
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
};

const getDetailTransaction = async (req, res) => {
    try {
        const foundTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            include: [{model: Product, include: [ProductImage]}, {model: User, as: 'buyer'}]
        });

        const image = foundTransaction.Product.ProductImages[0] ? foundTransaction.Product.ProductImages[0].product_pictures : null;
        const result = {
            id: foundTransaction.id,
            buyer_name: foundTransaction.buyer.name,
            buyer_city: foundTransaction.buyer.city,
            buyer_profile_picture: foundTransaction.buyer.profile_picture,
            buyer_phone_number: foundTransaction.buyer.phone_number,
            product_name: foundTransaction.Product.name,
            product_price: foundTransaction.Product.price,
            product_offer: foundTransaction.offer_price,
            product_pictures: image,
            status: foundTransaction.status,
            date: moment(foundTransaction.createdAt).locale("id").utc(7).format('Do MMM, h:mm')
        };

        // console.log(foundTransaction);

        if (!foundTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }
        res.status(200).json({
            status: 'success',
            msg: 'Transaction Ditemukan',
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: error.message
        })
    }
};

const updateRejectTransaction = async (req, res) => {
    try {
        const foundTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!foundTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }

        const updatedTransaction = await foundTransaction.update({
            status: "REJECTED"
        });

        if (!updatedTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }

        res.status(200).json({
            status: 'success',
            msg: 'Transaction berhasil di reject'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: error.message
        })
    }
};

const updateAcceptTransaction = async (req, res) => {
    try {
        const foundTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            include: [Product, {model: User, as: 'buyer'}]
        });

        const result = {
            id: foundTransaction.id,
            buyer_name: foundTransaction.buyer.name,
            buyer_city: foundTransaction.buyer.city,
            buyer_profile_picture: foundTransaction.buyer.profile_picture,
            buyer_phone_number: foundTransaction.buyer.phone_number,
            product_name: foundTransaction.Product.name,
            product_price: foundTransaction.Product.price,
            product_offer: foundTransaction.offer_price,
        }

        if (!foundTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }

        const updatedTransaction = await foundTransaction.update({
            status: "ACCEPTED"
        });

        await Notification.create({
            transaction_id: foundTransaction.id,
            user_id: foundTransaction.buyer_id,
            message: "Penawaran produk",
            role: "buyer"
        });

        if (!updatedTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }

        res.status(200).json({
            status: 'success',
            msg: 'Transaction berhasil di accept',
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: error.message
        })
    }
};

const updateStatusTransaction = async (req, res) => {
    try {
        const foundTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!foundTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }

        const updatedTransaction = await Product.update({
            status: req.body.isCompleted ? "COMPLETED" : "CANCELED"
        }, {
            where: {
                id: foundTransaction.product_id
            }
        });

        if (!updatedTransaction) {
            return res.status(404).json({
                msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
            })
        }

        res.status(200).json({
            status: 'success',
            msg: 'Status transaksi berhasil dirubah',
            data: {
                isCompleted: req.body.isCompleted
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: error.message
        })
    }
};

module.exports = {
    getAllTransactions,
    // getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getAllWishlist,
    getHistoryTransaction,
    getDetailTransaction,
    updateRejectTransaction,
    updateAcceptTransaction,
    updateStatusTransaction
}