const { Notification, Product, Transaction } = require('../models');

const getAllNotifications = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'product_id', 'user_id', 'message'],
            where: {
                user_id: req.user.id
            },
            include: [Product, {model: Product, include: [Transaction]}]
        };
        
        if(req.query) {
            let { page, row } = req.query;

            let pages = ((page - 1) * row);


            if (page && row) {
                options.offset = pages;
                options.limit = row;
            }
        }

        const allNotifications = await Notification.findAll(options);

        res.status(200).json({
            status: 'success',
            msg: 'Semua Notification ditampilkan', 
            data: allNotifications,
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
            message: message
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
  try{
      const { product_id, user_id, message } = req.body;
    
      const updatedNotification = await Notification.update({
            product_id: product_id,
            user_id: user_id,
            message: message
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
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const deleteNotification = async (req, res) => {
  try{
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
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
}