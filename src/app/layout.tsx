import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { SearchBar } from '@/components/SearchBar'
import { RiskDashboard } from '@/components/RiskDashboard'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

// Sample data - replace with your actual data source
const suggestions = [
  { type: 'Asset', name: 'Apple Inc.', symbol: 'AAPL', category: 'Stocks' },
  { type: 'Asset', name: 'Microsoft', symbol: 'MSFT', category: 'Stocks' },
  { type: 'Asset', name: 'Bitcoin', symbol: 'BTC', category: 'Crypto' },
  { type: 'Market', name: 'S&P 500', symbol: 'SPX', category: 'Index' },
  { type: 'Market', name: 'NASDAQ', symbol: 'NDX', category: 'Index' },
  { type: 'Market', name: 'US Treasury 10Y', symbol: 'US10Y', category: 'Bonds' },
]

export const metadata: Metadata = {
  title: 'RapidRisk - Real-Time Financial Market Insights',
  description: 'Professional-grade financial market analysis and insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans h-full bg-trading-bg text-trading-text-primary`}>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex">
            {/* Sidebar */}
            <aside className="w-sidebar bg-trading-sidebar border-r border-trading-border flex flex-col">
              <div className="p-4">
                <h1 className="text-trading-text-accent font-outfit font-bold text-lg">RAPIDRISK™</h1>
              </div>
              <nav className="flex-1 p-2">
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded text-trading-text-primary bg-trading-active">
                    Market Risk
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded text-trading-text-secondary hover:bg-trading-hover">
                    Portfolio Analysis
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded text-trading-text-secondary hover:bg-trading-hover">
                    Economic Indicators
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded text-trading-text-secondary hover:bg-trading-hover">
                    Sentiment Analysis
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded text-trading-text-secondary hover:bg-trading-hover">
                    Risk Reports
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              <header className="h-14 bg-trading-panel border-b border-trading-border flex items-center px-4 justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <SearchBar />
                  <div className="flex items-center space-x-4 ml-4">
                    <span className="text-trading-text-secondary text-sm">Global Risk Score:</span>
                    <span className="text-trading-text-negative text-sm font-mono">78.5</span>
                    <span className="text-trading-text-secondary text-sm">|</span>
                    <span className="text-trading-text-secondary text-sm">VIX:</span>
                    <span className="text-trading-text-accent text-sm font-mono">23.45</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-trading-text-secondary hover:text-trading-text-primary">
                    <span className="text-sm">Reports</span>
                  </button>
                  <button className="p-2 text-trading-text-secondary hover:text-trading-text-primary">
                    <span className="text-sm">Alerts</span>
                  </button>
                  <button className="p-2 text-trading-text-secondary hover:text-trading-text-primary">
                    <span className="text-sm">Settings</span>
                  </button>
                </div>
              </header>

              {/* Main Content Area */}
              <main className="flex-1 overflow-hidden">
                {children}
              </main>
            </div>

            {/* Right Sidebar - Risk Dashboard */}
            <aside className="w-96 bg-trading-panel border-l border-trading-border">
              <RiskDashboard />
            </aside>
          </div>
          
          {/* Footer Warning */}
          <footer className="h-8 bg-trading-bg border-t border-trading-border flex items-center justify-center px-4">
            <p className="text-xs text-trading-text-negative">⚠️ Warning: Capital at risk. RapidRisk™ is a market analysis tool, not a financial advisor.</p>
          </footer>
        </div>
      </body>
    </html>
  )
} 