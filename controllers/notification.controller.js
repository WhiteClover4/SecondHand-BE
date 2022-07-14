const { Notification, Product, Transaction, ProductImage } = require('../models');
const moment = require('moment');

const getAllNotifications = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'transaction_id', 'user_id', 'message', 'role', 'is_read'],
            where: {
                user_id: req.user.id
            },
            order: [
                ['created_at', 'DESC']
            ],
            include: [{model: Transaction, include: [{ model: Product, include: [ProductImage] }]}]
        };

        if (req.query) {
            let { page, row } = req.query;

            let pages = ((page - 1) * row);


            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }

        const allNotifications = await Notification.findAll(options);
        const result = allNotifications.map((eachNotification) => {
            const image = eachNotification.Transaction.Product.ProductImages[0] ? eachNotification.Transaction.Product.ProductImages[0].product_pictures : null;
            return {
                id: eachNotification.id,
                message: eachNotification.message,
                is_read: eachNotification.is_read,
                role: eachNotification.role,
                product_id: eachNotification.Transaction.product_id,
                product_name: eachNotification.Transaction.Product.name,
                product_price: eachNotification.Transaction.Product.price,
                product_offer_price: eachNotification.Transaction.offer_price,
                product_image: image,
                transaction_id: eachNotification.Transaction.id,
                transaction_status: eachNotification.Transaction.status,
                date: moment(eachNotification.createdAt).locale("id").utc(7).format('Do MMM, h:mm'),
            }
        })

        res.status(200).json({
            status: 'success',
            msg: 'Semua Notification ditampilkan',
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const getNotificationById = async (req, res) => {
    const foundNotification = await Notification.findByPk(req.params.id);

    if (!foundNotification) {
        return res.status(404).json({
            msg: `Notification dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        msg: 'Notification Ditemukan',
        data: foundNotification
    })
}

const createNotification = async (req, res) => {
    try {
        const { product_id, user_id, message } = req.body;

        const createdNotification = await Notification.create({
            product_id: product_id,
            user_id: user_id,
            message: message,
            is_read: false
        });

        res.status(201).json({
            status: 'success',
            msg: 'Notification berhasil ditambahkan',
            data: createdNotification
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const updateNotification = async (req, res) => {
    try {
        const { product_id, user_id, message } = req.body;

        const updatedNotification = await Notification.update({
            product_id: product_id,
            user_id: user_id,
            message: message,
            is_read: true
        }, {
            where: {
                id: req.params.id
            }, returning: true
        });
        if (!updatedNotification[0]) {
            return res.status(404).json({
                msg: `Notification dengan id ${req.params.id} tidak ditemukan`
            })
        }
        res.status(200).json({
            status: 'success',
            msg: 'Notification berhasil diubah',
            data: updatedNotification[1]
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const deleteNotification = async (req, res) => {
    try {
        const deletedNotification = await Notification.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedNotification) {
            return res.status(404).json({
                msg: `Notification dengan id ${req.params.id} tidak ditemukan`
            })
        }
        res.status(200).json({
            status: 'success',
            msg: 'Notification berhasil dihapus'
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
}

const updateReadNotification = async (req, res) => {
    try {
        const updatedNotification = await Notification.update({
            is_read: true
        }, {
            where: {
                id: req.params.id
            }, returning: true
        });
        if (!updatedNotification[0]) {
            return res.status(404).json({
                msg: `Notification dengan id ${req.params.id} tidak ditemukan`
            })
        }
        res.status(200).json({
            status: 'success',
            msg: 'Notification berhasil diubah',
            data: updatedNotification[1]
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })
    }
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    updateReadNotification
}