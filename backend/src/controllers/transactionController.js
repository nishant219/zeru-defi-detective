import { Transaction } from '../models/transcationModel.js';
import { AaveService } from '../services/aaveService.js';

export class TransactionController {
  static async getActiveAccounts(req, res) {
    try {
      const accounts = await AaveService.fetchActiveAccounts();
      res.json({ accounts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch active accounts' });
    }
  }

  static async getWalletTransactions(req, res) {
    try {
      const { address } = req.params;
      const aaveTransactions = await AaveService.fetchUserTransactions(address);

      await Promise.all(aaveTransactions.map(async (tx) => {
        await Transaction.findOneAndUpdate(
          { id: tx.id },
          { walletAddress: address.toLowerCase(), ...tx },
          { upsert: true, new: true }
        );
      }));

      const transactions = await Transaction.find({ 
        walletAddress: address.toLowerCase() 
      }).sort({ timestamp: -1 });

      res.json(transactions);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }

  static async getWalletStats(req, res) {
    try {
      const { address } = req.params;
      const transactions = await Transaction.find({ 
        walletAddress: address.toLowerCase() 
      });

      const stats = {
        totalTransactions: transactions.length,
        totalVolumeUSD: transactions.reduce((acc, tx) => {
          return acc + parseFloat(tx.amountUSD);
        }, 0).toFixed(2),
        volumeByDay: transactions.reduce((acc, tx) => {
          const date = new Date(tx.timestamp * 1000).toISOString().split('T')[0];
          const amount = parseFloat(tx.amountUSD);
          acc[date] = (acc[date] || 0) + amount;
          acc[date] = parseFloat(acc[date].toFixed(2));
          return acc;
        }, {}),
        transactionsByType: transactions.reduce((acc, tx) => {
          acc[tx.type] = (acc[tx.type] || 0) + 1;
          return acc;
        }, {})
      };

      res.json(stats);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to calculate stats' });
    }
  }
}

