export default function StatsDisplay({ stats }) {
    const cards = [
      {
        title: 'Total Transactions',
        value: stats.totalTransactions.toLocaleString(),
        // icon: (
        //   <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        //   </svg>
        // ),
      },
      {
        title: 'Total Volume',
        value: `$${parseFloat(stats.totalVolumeUSD).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        // icon: (
        //   <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        //   </svg>
        // ),
      },
      {
        title: 'Transaction Types',
        content: Object.entries(stats.transactionsByType).map(([type, count]) => (
          <div key={type} className="flex justify-between items-center">
            <span className="capitalize text-gray-600">{type}</span>
            <span className="font-medium text-gray-900">{count}</span>
          </div>
        )),
        // icon: (
        //   <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        //   </svg>
        // ),
      },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                {card.icon}
              </div>
              {card.content ? (
                <div className="space-y-2">{card.content}</div>
              ) : (
                <p className="text-3xl font-semibold text-gray-900">{card.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }