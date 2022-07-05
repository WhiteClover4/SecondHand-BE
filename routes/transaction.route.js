const express           = require('express');
const router            = express.Router();
const transactionRoutes = require('../controllers/transaction.controller');
const userChecking      = require('../misc/passport');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', transactionRoutes.getAllTransactions);
router.get('/wishlist', userChecking, transactionRoutes.getAllWishlist);
router.get('/history', userChecking, transactionRoutes.getHistoryTransaction);
router.get('/:id', userChecking, transactionRoutes.getDetailTransaction);
router.put('/:id/reject', userChecking, transactionRoutes.updateRejectTransaction);
router.put('/:id/accept', userChecking, transactionRoutes.updateAcceptTransaction);
router.put('/:id/status', userChecking, transactionRoutes.updateStatusTransaction);
router.post('/', transactionRoutes.createTransaction);
router.put('/:id', createValidationFor('create-buyer/transaction'), checkValidationResult, userChecking, transactionRoutes.updateTransaction);
router.delete('/:id', transactionRoutes.deleteTransaction);

module.exports = router;