const express           = require('express');
const router            = express.Router();
const transactionRoutes = require('../controllers/transaction.controller');
const {authenticate}      = require('../misc/passport');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/wishlist', authenticate, transactionRoutes.getAllWishlist);
router.get('/history', authenticate, transactionRoutes.getHistoryTransaction);
router.get('/:id', authenticate, transactionRoutes.getDetailTransaction);
router.get('/:id/status', authenticate, transactionRoutes.getStatusTransaction);
router.put('/:id/reject', authenticate, transactionRoutes.updateRejectTransaction);
router.put('/:id/accept', authenticate, transactionRoutes.updateAcceptTransaction);
router.put('/:id/status', authenticate, transactionRoutes.updateStatusTransaction);
router.put('/:id', createValidationFor('create-buyer/transaction'), checkValidationResult, authenticate, transactionRoutes.updateTransaction);

module.exports = router;