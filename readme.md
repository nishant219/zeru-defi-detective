# 🔍 Zeru DeFi Detective

## The Challenge
Develop a DeFi analytics dashboard that helps users investigate their Aave activities. Join us in building tools that make DeFi more transparent and accessible!


## 🏗️ System Architecture

- **Frontend**: Next.js
- **Backend**: Node.js/Express
- **Database**: MongoDB
- **Data Source**: Aave GraphQL API

## 🚀 Features

- Fetch and store user transaction data from Aave
- Get wallet-specific transaction history
- Calculate wallet statistics and analytics
- Fetch active Aave accounts
- Real-time data synchronization
- MongoDB caching for faster responses

## 🛠️ API Endpoints

### 1. Get Active Accounts
```
GET /api/accounts/active
```
Returns a list of currently active accounts on Aave.

**Response Example:**
```json
{
  "accounts": [
    "0x1234...",
    "0x5678..."
  ]
}
```

### 2. Get Wallet Transactions
```
GET /api/wallet/:address
```
Fetches all transactions for a specific wallet address.

**Response Example:**
```json
[
  {
    "id": "0x...",
    "timestamp": 1641234567,
    "amount": "1000000000000000000",
    "amountUSD": "1000.00",
    "type": "deposit",
    "symbol": "USDC",
    "decimals": 6
  }
]
```

### 3. Get Wallet Statistics
```
GET /api/wallet/:address/stats
```
Returns analytical data for a specific wallet.

**Response Example:**
```json
{
  "totalTransactions": 10,
  "totalVolumeUSD": "5000.00",
  "volumeByDay": {
    "2024-01-01": 1000.00,
    "2024-01-02": 4000.00
  },
  "transactionsByType": {
    "deposit": 3,
    "withdraw": 2,
    "borrow": 3,
    "repay": 2
  }
}
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
GRAPH_API_KEY=your_graph_api_key
```

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zeru-defi-detective.git
cd zeru-defi-detective
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📚 Tech Stack Details

### Backend
- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **GraphQL Request**: API client for Aave's GraphQL endpoint
- **Cors**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger

### Database
- **MongoDB**: NoSQL database for storing transaction data
- **Indexes**: Optimized for wallet address and timestamp queries


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
