export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>DeFi Detective</title>
      </head>
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="min-h-screen">
          <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    DeFi Detective
                  </h1>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}