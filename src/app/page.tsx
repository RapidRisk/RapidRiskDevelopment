import React from 'react';

export default function Home() {
  return (
    <div className="h-full grid grid-cols-trading gap-0.5">
      {/* Main Analysis Area */}
      <div className="col-span-2 bg-trading-bg p-4">
        <div className="h-[calc(100vh-8rem)] space-y-4">
          {/* Risk Overview */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-trading-panel rounded border border-trading-border p-4">
              <h3 className="text-sm text-trading-text-secondary mb-2">Market Risk Score</h3>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-mono text-trading-text-negative">78.5</div>
                <div className="text-trading-text-negative text-sm">High Risk</div>
              </div>
              <div className="text-trading-text-secondary text-tiny mt-2">
                Based on volatility, market sentiment, and economic indicators
              </div>
            </div>
            <div className="bg-trading-panel rounded border border-trading-border p-4">
              <h3 className="text-sm text-trading-text-secondary mb-2">Volatility Index</h3>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-mono text-trading-text-accent">23.45</div>
                <div className="text-trading-text-accent text-sm">Moderate</div>
              </div>
              <div className="text-trading-text-secondary text-tiny mt-2">
                30-day rolling volatility across major indices
              </div>
            </div>
            <div className="bg-trading-panel rounded border border-trading-border p-4">
              <h3 className="text-sm text-trading-text-secondary mb-2">Correlation Risk</h3>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-mono text-trading-text-positive">0.32</div>
                <div className="text-trading-text-positive text-sm">Low Risk</div>
              </div>
              <div className="text-trading-text-secondary text-tiny mt-2">
                Cross-asset correlation coefficient
              </div>
            </div>
          </div>

          {/* Risk Analysis Chart */}
          <div className="bg-trading-panel rounded border border-trading-border p-4 h-[calc(100%-12rem)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm">Risk Analysis Trends</h3>
              <div className="flex space-x-2">
                <button className="text-trading-text-secondary hover:text-trading-text-primary text-sm px-3 py-1 rounded bg-trading-hover">
                  1D
                </button>
                <button className="text-trading-text-accent text-sm px-3 py-1 rounded bg-trading-active">
                  1W
                </button>
                <button className="text-trading-text-secondary hover:text-trading-text-primary text-sm px-3 py-1 rounded bg-trading-hover">
                  1M
                </button>
                <button className="text-trading-text-secondary hover:text-trading-text-primary text-sm px-3 py-1 rounded bg-trading-hover">
                  1Y
                </button>
              </div>
            </div>
            <div className="h-[calc(100%-2rem)] chart-container">
              Chart Area: Risk Metrics Over Time
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors Panel */}
      <div className="bg-trading-bg p-4">
        <div className="space-y-4">
          {/* Market Sentiment */}
          <div className="bg-trading-panel rounded border border-trading-border p-4">
            <h3 className="text-sm mb-4">Market Sentiment Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">Fear & Greed Index</span>
                <span className="text-trading-text-negative font-mono">25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">News Sentiment</span>
                <span className="text-trading-text-accent font-mono">Neutral</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">Social Media Sentiment</span>
                <span className="text-trading-text-negative font-mono">Bearish</span>
              </div>
            </div>
          </div>

          {/* Economic Indicators */}
          <div className="bg-trading-panel rounded border border-trading-border p-4">
            <h3 className="text-sm mb-4">Economic Risk Factors</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">Interest Rate Risk</span>
                <span className="text-trading-text-negative font-mono">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">Inflation Risk</span>
                <span className="text-trading-text-accent font-mono">Moderate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">Currency Risk</span>
                <span className="text-trading-text-positive font-mono">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-trading-text-secondary text-sm">Liquidity Risk</span>
                <span className="text-trading-text-accent font-mono">Moderate</span>
              </div>
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-trading-panel rounded border border-trading-border p-4">
            <h3 className="text-sm mb-4">Risk Alerts</h3>
            <div className="space-y-3">
              <div className="bg-trading-hover rounded p-3 border border-trading-text-negative">
                <div className="flex items-center text-trading-text-negative text-sm mb-1">
                  High Volatility Alert
                </div>
                <div className="text-trading-text-secondary text-tiny">
                  Unusual volatility detected in tech sector
                </div>
              </div>
              <div className="bg-trading-hover rounded p-3 border border-trading-text-accent">
                <div className="flex items-center text-trading-text-accent text-sm mb-1">
                  Correlation Warning
                </div>
                <div className="text-trading-text-secondary text-tiny">
                  Increasing correlation between crypto and equity markets
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 