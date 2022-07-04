const express           = require('express');
const router            = express.Router();
const transactionRoutes = require('../controllers/transaction.controller');
const userChecking      = require('../misc/passport');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', transactionRoutes.getAllTransactions);
router.get('/:id', transactionRoutes.getTransactionById);
router.post('/', transactionRoutes.createTransaction);
router.put('/:id', createValidationFor('create-buyer/transaction'), checkValidationResult, userChecking, transactionRoutes.updateTransaction);
router.delete('/:id', transactionRoutes.deleteTransaction);

module.exports = router;