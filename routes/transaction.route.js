const express           = require('express');
const router            = express.Router();
const transactionRoutes = require('../controllers/transaction.controller');
const userChecking      = require('../misc/passport');

router.get('/', transactionRoutes.getAllTransactions);
router.get('/wishlist', userChecking, transactionRoutes.getAllWishlist);
router.get('/history', userChecking, transactionRoutes.getHistoryTransaction);
router.get('/:id', userChecking, transactionRoutes.getDetailTransaction);
router.put('/:id/reject', userChecking, transactionRoutes.updateRejectTransaction);
router.put('/:id/accept', userChecking, transactionRoutes.updateAcceptTransaction);
router.put('/:id/status', userChecking, transactionRoutes.updateStatusTransaction);
router.post('/', transactionRoutes.createTransaction);
router.put('/:id', userChecking, transactionRoutes.updateTransaction);
router.delete('/:id', transactionRoutes.deleteTransaction);

module.exports = router;