import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadActiveAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accounts/active');
        const data = await response.json();
        setSuggestions(data.accounts);
      } catch (error) {
        console.error('Failed to load active accounts:', error);
      }
    };
    loadActiveAccounts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative rounded-2xl shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            {/* <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          </div>
          <input
            type="text"
            placeholder="Enter wallet address..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="block w-full rounded-2xl border-gray-200 pl-12 pr-4 py-4 focus:border-indigo-500 focus:ring-indigo-500 text-lg shadow-sm"
          />
          <button
            type="submit"
            className="absolute inset-y-2 right-2 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-100">
          <ul className="py-2 max-h-60 overflow-auto">
            {suggestions.map((account) => (
              <li
                key={account}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                onClick={() => {
                  setInput(account);
                  setShowSuggestions(false);
                  onSearch(account);
                }}
              >
                {account}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}