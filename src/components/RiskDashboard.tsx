'use client'

import { useState } from 'react'

type RiskMetric = {
  name: string
  value: number | string
  status: 'positive' | 'negative' | 'neutral' | 'warning'
}

type RiskCategory = {
  name: string
  metrics: RiskMetric[]
}

// Sample data - replace with real-time data
const riskCategories: RiskCategory[] = [
  {
    name: 'Market Risk',
    metrics: [
      { name: 'VIX', value: 23.45, status: 'warning' },
      { name: 'Historical Volatility', value: '15.2%', status: 'neutral' },
      { name: 'Market Sentiment', value: 'Bearish', status: 'negative' },
      { name: 'Market Breadth', value: '0.85', status: 'neutral' },
      { name: 'Beta', value: 1.2, status: 'warning' },
      { name: 'Sharpe Ratio', value: 1.8, status: 'positive' },
      { name: 'Drawdown', value: '-8.5%', status: 'negative' },
      { name: 'Cross-Asset Correlation', value: '0.65', status: 'warning' }
    ]
  },
  {
    name: 'Portfolio Analysis',
    metrics: [
      { name: 'Position Size', value: '12.5%', status: 'warning' },
      { name: 'Diversification Index', value: 0.78, status: 'positive' },
      { name: 'Sector Weighting', value: 'Tech Heavy', status: 'warning' },
      { name: 'Value at Risk (VaR)', value: '-2.3%', status: 'negative' },
      { name: 'CVaR', value: '-3.8%', status: 'negative' },
      { name: 'Hedge Ratio', value: '0.45', status: 'neutral' },
      { name: 'Portfolio Turnover', value: '35%', status: 'neutral' },
      { name: 'Leverage', value: '1.5x', status: 'warning' }
    ]
  },
  {
    name: 'Economic Indicators',
    metrics: [
      { name: 'Interest Rates', value: '5.25%', status: 'warning' },
      { name: 'Inflation Rate', value: '3.4%', status: 'negative' },
      { name: 'GDP Growth', value: '2.1%', status: 'positive' },
      { name: 'Unemployment Rate', value: '3.8%', status: 'positive' },
      { name: 'Consumer Confidence', value: 98.5, status: 'neutral' },
      { name: 'Manufacturing PMI', value: 48.5, status: 'negative' },
      { name: 'Fiscal Deficit', value: '-3.5%', status: 'warning' },
      { name: 'Trade Balance', value: '-45B', status: 'negative' },
      { name: 'Credit Spreads', value: '280bps', status: 'warning' }
    ]
  },
  {
    name: 'Sentiment Analysis',
    metrics: [
      { name: 'News Sentiment', value: -0.25, status: 'negative' },
      { name: 'Social Media Sentiment', value: 0.15, status: 'positive' },
      { name: 'Earnings Sentiment', value: 'Mixed', status: 'neutral' },
      { name: 'Options Volume', value: '+45%', status: 'warning' },
      { name: 'Put/Call Ratio', value: 1.25, status: 'negative' },
      { name: 'Investor Positioning', value: 'Net Short', status: 'negative' },
      { name: 'Fear & Greed Index', value: 25, status: 'negative' }
    ]
  },
  {
    name: 'Credit Risk',
    metrics: [
      { name: 'Credit Rating', value: 'A+', status: 'positive' },
      { name: 'Default Probability', value: '0.5%', status: 'positive' },
      { name: 'Bond Yield Spreads', value: '150bps', status: 'neutral' },
      { name: 'Debt/Equity Ratio', value: 0.85, status: 'positive' }
    ]
  },
  {
    name: 'Liquidity Risk',
    metrics: [
      { name: 'Bid-Ask Spread', value: '0.05%', status: 'positive' },
      { name: 'Daily Volume', value: '12.5M', status: 'positive' },
      { name: 'Market Depth', value: 'High', status: 'positive' },
      { name: 'Turnover Ratio', value: '3.2', status: 'neutral' }
    ]
  },
  {
    name: 'Currency Risk',
    metrics: [
      { name: 'Exchange Volatility', value: '8.5%', status: 'warning' },
      { name: 'Rate Differentials', value: '2.1%', status: 'neutral' },
      { name: 'CB Interventions', value: 'Active', status: 'warning' }
    ]
  },
  {
    name: 'Geopolitical Risk',
    metrics: [
      { name: 'Trade Wars', value: 'High', status: 'negative' },
      { name: 'Sanctions Risk', value: 'Medium', status: 'warning' },
      { name: 'Military Conflicts', value: 'Elevated', status: 'negative' },
      { name: 'Election Impact', value: 'Low', status: 'positive' },
      { name: 'Climate Events', value: 'Moderate', status: 'warning' }
    ]
  }
]

export function RiskDashboard() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Market Risk'])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    )
  }

  const getStatusColor = (status: RiskMetric['status']) => {
    switch (status) {
      case 'positive':
        return 'text-trading-text-positive'
      case 'negative':
        return 'text-trading-text-negative'
      case 'warning':
        return 'text-trading-text-accent'
      default:
        return 'text-trading-text-secondary'
    }
  }

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-2 p-4">
        {riskCategories.map((category) => (
          <div key={category.name} className="bg-trading-panel border border-trading-border rounded">
            <button
              className="w-full px-4 py-2 flex items-center justify-between text-left"
              onClick={() => toggleCategory(category.name)}
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-trading-text-secondary">
                {expandedCategories.includes(category.name) ? '−' : '+'}
              </span>
            </button>
            {expandedCategories.includes(category.name) && (
              <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                {category.metrics.map((metric) => (
                  <div key={metric.name} className="flex justify-between items-center">
                    <span className="text-sm text-trading-text-secondary">{metric.name}</span>
                    <span className={`text-sm font-mono ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 