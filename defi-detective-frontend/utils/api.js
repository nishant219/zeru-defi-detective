const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWalletTransactions = async (address) => {
  const response = await fetch(`${API_URL}/api/wallet/${address}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const fetchWalletStats = async (address) => {
  const response = await fetch(`${API_URL}/api/wallet/${address}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};

export const fetchActiveAccounts = async () => {
  const response = await fetch(`${API_URL}/api/accounts/active`);
  if (!response.ok) {
    throw new Error('Failed to fetch active accounts');
  }
  return response.json();
};