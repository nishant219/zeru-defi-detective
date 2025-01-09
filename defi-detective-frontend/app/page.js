'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TransactionTable from '../components/TransactionTable';
import StatsDisplay from '../components/StatsDisplay';
import VolumeChart from '../components/VolumeChart';
import WelcomeHero from '../components/WelcomeScreen';

export default function Home() {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (walletAddress) => {
    setLoading(true);
    setError('');
    try {
      const [txResponse, statsResponse] = await Promise.all([
        fetch(`https://zeru-defi-detective-server.vercel.app/api/wallet/${walletAddress}`),
        fetch(`https://zeru-defi-detective-server.vercel.app/api/wallet/${walletAddress}/stats`)
      ]);

      if (!txResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const txData = await txResponse.json();
      const statsData = await statsResponse.json();

      setTransactions(txData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to fetch wallet data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {!address && <WelcomeHero />}
      
      <div className="max-w-3xl mx-auto">
        <SearchBar 
          onSearch={(addr) => {
            setAddress(addr);
            fetchData(addr);
          }} 
        />
      </div>
      
      {error && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg> */}
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-500">Fetching wallet data...</p>
        </div>
      ) : (
        <>
          {stats && <StatsDisplay stats={stats} />}
          {stats && <VolumeChart volumeByDay={stats.volumeByDay} />}
          {transactions.length > 0 && <TransactionTable transactions={transactions} />}
        </>
      )}
    </div>
  );
}