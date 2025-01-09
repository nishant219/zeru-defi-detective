import { request, gql } from 'graphql-request';
import { config } from '../config/dbConfig.js';

const ACTIVE_ACCOUNTS_QUERY = gql`
  query GetActiveAccounts {
    accounts(first: 10) {
      id
    }
  }
`;

const TRANSACTIONS_QUERY = gql`
  query GetUserTransactions($userAddress: String!) {
    deposits(
      where: { account: $userAddress }
      orderBy: timestamp
      orderDirection: desc
      first: 100
    ) {
      id
      timestamp
      amount
      amountUSD
      market {
        inputToken {
          symbol
          decimals
        }
      }
    }
    borrows(
      where: { account: $userAddress }
      orderBy: timestamp
      orderDirection: desc
      first: 100
    ) {
      id
      timestamp
      amount
      amountUSD
      market {
        inputToken {
          symbol
          decimals
        }
      }
    }
    repays(
      where: { account: $userAddress }
      orderBy: timestamp
      orderDirection: desc
      first: 100
    ) {
      id
      timestamp
      amount
      amountUSD
      market {
        inputToken {
          symbol
          decimals
        }
      }
    }
    withdraws(
      where: { account: $userAddress }
      orderBy: timestamp
      orderDirection: desc
      first: 100
    ) {
      id
      timestamp
      amount
      amountUSD
      market {
        inputToken {
          symbol
          decimals
        }
      }
    }
  }
`;

export class AaveService {
  static async fetchActiveAccounts() {
    try {
      const data = await request(config.GRAPH_API_URL, ACTIVE_ACCOUNTS_QUERY);
      return data.accounts.map(account => account.id);
    } catch (error) {
      console.error('Error fetching active accounts:', error);
      throw error;
    }
  }

  static async fetchUserTransactions(address) {
    try {
      const data = await request(config.GRAPH_API_URL, TRANSACTIONS_QUERY, { 
        userAddress: address.toLowerCase() 
      });

      const formatTransactions = (txs, type) => txs.map(tx => ({
        id: tx.id,
        timestamp: parseInt(tx.timestamp),
        amount: tx.amount,
        amountUSD: tx.amountUSD,
        type,
        symbol: tx.market.inputToken.symbol,
        decimals: tx.market.inputToken.decimals
      }));

      const allTransactions = [
        ...formatTransactions(data.deposits, 'deposit'),
        ...formatTransactions(data.borrows, 'borrow'),
        ...formatTransactions(data.repays, 'repay'),
        ...formatTransactions(data.withdraws, 'withdraw')
      ];

      return allTransactions;
    } catch (error) {
      console.error('Error fetching from Aave:', error);
      throw error;
    }
  }
}


