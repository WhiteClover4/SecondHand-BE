const { Transaction, Product } = require('../models');

const getAllTransactions = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'seller_id', 'buyer_id', 'product_id', 'offer_price'],
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

const getTransactionById = async (req, res) => {
    const foundTransaction = await Transaction.findByPk(req.params.id);

    if (!foundTransaction) {
        return res.status(404).json({
            msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        msg: 'Transaction Ditemukan',
        data: foundTransaction
    })
}

const createTransaction = async (req, res) => {
    try {
        const { seller_id, buyer_id, product_id, offer_price } = req.body;

        const createdTransaction = await Transaction.create({
            seller_id: seller_id,
            buyer_id: buyer_id,
            product_id: product_id,
            offer_price: offer_price
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
                offer_price: offer_price
            });

            await Notification.create({
                user_id: foundProduct.Transactions[0].seller_id,
                message: "Penawaran produk",
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

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
}