const express        = require('express');
const router         = express.Router();
const transactionRoutes     = require('../controllers/transaction.controller');

router.get('/', transactionRoutes.getAllTransactions);
router.get('/:id', transactionRoutes.getTransactionById);
router.post('/', transactionRoutes.createTransaction);
router.put('/:id', transactionRoutes.updateTransaction);
router.delete('/:id', transactionRoutes.deleteTransaction);

module.exports = router;