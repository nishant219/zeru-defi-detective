import express from 'express';
import { TransactionController } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/accounts/active', TransactionController.getActiveAccounts);
router.get('/wallet/:address', TransactionController.getWalletTransactions);
router.get('/wallet/:address/stats', TransactionController.getWalletStats);

export const transactionRoutes = router;