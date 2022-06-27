const { Transaction } = require('../models');

const getAllTransactions = async (req, res) => {
    try {
        const options = {
            attributes: ['id', 'seller_id', 'buyer_id', 'product_id', 'offer_prince'],
        };
        
        if(req.query) {
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
        const { seller_id, buyer_id, product_id, offer_prince } = req.body;
    
        const createdTransaction = await Transaction.create({
            seller_id: seller_id,
            buyer_id: buyer_id,
            product_id: product_id,
            offer_prince: offer_prince
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
  try{
      const { seller_id, buyer_id, product_id, offer_prince } = req.body;
    
      const updatedTransaction = await Transaction.update({
            seller_id: seller_id,
            buyer_id: buyer_id,
            product_id: product_id,
            offer_prince: offer_prince
      }, {
        where: {
          id: req.params.id
        }, returning: true 
      });
      if (!updatedTransaction[0]) {
        return res.status(404).json({
          msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
      })
      }
      res.status(200).json({ 
          status: 'success',
          msg: 'Transaction berhasil diubah',
          data: updatedTransaction[1]
      })
  } catch(err){
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const deleteTransaction = async (req, res) => {
  try{
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
  } catch(err){
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