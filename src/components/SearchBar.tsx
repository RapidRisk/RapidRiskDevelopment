'use client'

import { useState } from 'react'

// Sample data - replace with your actual data source
const suggestions = [
  { type: 'Asset', name: 'Apple Inc.', symbol: 'AAPL', category: 'Stocks' },
  { type: 'Asset', name: 'Microsoft', symbol: 'MSFT', category: 'Stocks' },
  { type: 'Asset', name: 'Bitcoin', symbol: 'BTC', category: 'Crypto' },
  { type: 'Market', name: 'S&P 500', symbol: 'SPX', category: 'Index' },
  { type: 'Market', name: 'NASDAQ', symbol: 'NDX', category: 'Index' },
  { type: 'Market', name: 'US Treasury 10Y', symbol: 'US10Y', category: 'Bonds' },
]

export function SearchBar() {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredSuggestions = suggestions.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search assets or markets..."
          className="bg-trading-bg border border-trading-border rounded px-3 py-1.5 w-64 text-sm focus:outline-none focus:border-trading-text-accent"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-trading-text-secondary hover:text-trading-text-primary"
          >
            ×
          </button>
        )}
      </div>
      {showSuggestions && (
        <div 
          className="absolute top-full left-0 w-full mt-1 bg-trading-panel border border-trading-border rounded shadow-lg z-50"
          onMouseLeave={() => setShowSuggestions(false)}
        >
          {filteredSuggestions.length > 0 ? (
            <div className="py-1">
              {filteredSuggestions.map((item) => (
                <button
                  key={item.symbol}
                  className="w-full text-left px-3 py-2 hover:bg-trading-hover flex items-center justify-between"
                  onClick={() => {
                    setSearch(item.symbol)
                    setShowSuggestions(false)
                  }}
                >
                  <div>
                    <span className="font-mono text-trading-text-accent">{item.symbol}</span>
                    <span className="text-trading-text-secondary ml-2 text-sm">{item.name}</span>
                  </div>
                  <span className="text-trading-text-secondary text-xs">{item.category}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 text-trading-text-secondary text-sm">
              No matches found
            </div>
          )}
        </div>
      )}
    </div>
  )
} 