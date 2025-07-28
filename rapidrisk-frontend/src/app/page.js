// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data - this can be replaced later with historical data from the API
const mockChartData = [
  { name: 'Jan', price: 188 }, { name: 'Feb', price: 185 }, { name: 'Mar', price: 190 },
  { name: 'Apr', price: 188 }, { name: 'May', price: 192 }, { name: 'Jun', price: 195 },
  { name: 'Jul', price: 196 },
];

export default function Dashboard() {
  // State for search input and the ticker being analyzed
  const [searchTerm, setSearchTerm] = useState("AAPL");
  const [activeTicker, setActiveTicker] = useState("AAPL");
  
  // State for holding data from our API
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect runs when `activeTicker` changes, fetching new data
  useEffect(() => {
    if (!activeTicker) return;

    setLoading(true);
    setError(null);
    setAnalysisData(null); // Clear previous data

    fetch(`http://127.0.0.1:8000/api/analyze/${activeTicker}`)
      .then(res => {
        if (!res.ok) {
          // Get error detail from backend if available
          return res.json().then(err => { throw new Error(err.detail || 'API Error') });
        }
        return res.json();
      })
      .then(data => {
        setAnalysisData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch analysis:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [activeTicker]); // Re-run effect when activeTicker changes

  // Function to handle the search action
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setActiveTicker(searchTerm.trim().toUpperCase());
    }
  };

  // Function to handle 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="bg-[#111827] min-h-screen text-gray-300 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Functional Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-white">RapidRisk</h1>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="e.g., MSFT, GOOGL..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm w-48 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <button 
              onClick={handleSearch}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-1.5 rounded-md text-sm"
            >
              Search
            </button>
          </div>
        </header>

        {/* Conditional Rendering: Shows Loading, Error, or the Dashboard */}
        {loading && <div className="text-center p-10 font-semibold">Loading analysis for {activeTicker}...</div>}
        
        {error && <div className="text-center p-10 text-red-400 font-semibold">Error: {error}</div>}

        {/* This entire block will only render when data is successfully loaded */}
        {analysisData && !loading && !error && (
          <>
            {/* Ticker and Main Stats */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">{analysisData.market_data.ticker} <span className="text-2xl font-medium text-gray-400">{analysisData.market_data.company_name}</span></h2>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex flex-col"><span className="text-gray-400">Rating</span><span className="text-white font-semibold text-lg">{analysisData.credit_rating}</span></div>
                  <div className="flex flex-col"><span className="text-gray-400">Current Price</span><span className={`text-white font-semibold text-lg`}>${analysisData.market_data.current_price.toFixed(2)} <span className={analysisData.market_data.price_change_24h_percent >= 0 ? 'text-green-400' : 'text-red-400'}>{analysisData.market_data.price_change_24h_percent.toFixed(2)}% {analysisData.market_data.price_change_24h_percent >= 0 ? '▲' : '▼'}</span></span></div>
                  <div className="flex flex-col"><span className="text-gray-400">News Sentiment</span><span className="text-white font-semibold text-lg">{(analysisData.sentiment_analysis.overall_sentiment_score * 100).toFixed(0)}% {analysisData.sentiment_analysis.sentiment_label}</span></div>
                  <div className="flex flex-col"><span className="text-gray-400">Risk Model</span><span className="text-white font-semibold text-lg">{analysisData.predictions.risk_model}</span></div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Chart and Predictions */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-4">Price History</h3>
                  <div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={mockChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><defs><linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4}/><stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="name" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} /><Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} /><Area type="monotone" dataKey="price" stroke="#2dd4bf" fill="url(#colorPrice)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-4">Predictions (1Y)</h3>
                  <table className="w-full text-left text-sm">
                    <thead><tr className="border-b border-gray-700"><th className="py-2 font-medium text-gray-400">Horizon</th><th className="py-2 font-medium text-gray-400">Prediction</th></tr></thead>
                    <tbody>
                      <tr><td className="py-2">1 Week</td><td>${analysisData.predictions.one_week_prediction.toFixed(2)}</td></tr>
                      <tr><td className="py-2">1 Month</td><td>${analysisData.predictions.one_month_prediction.toFixed(2)}</td></tr>
                      <tr><td className="py-2">1 Year</td><td>${analysisData.predictions.one_year_prediction.toFixed(2)}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Right Column: Sentiment and Risk */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-4">Sentiment</h3>
                  <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between"><span>Positive</span><span>{(analysisData.sentiment_analysis.positive_percent * 100).toFixed(0)}%</span></div>
                      <div className="flex justify-between"><span>Neutral</span><span>{(analysisData.sentiment_analysis.neutral_percent * 100).toFixed(0)}%</span></div>
                      <div className="flex justify-between"><span>Negative</span><span>{(analysisData.sentiment_analysis.negative_percent * 100).toFixed(0)}%</span></div>
                  </div>
                  <h4 className="font-semibold text-gray-300 text-sm mt-4">Key Headlines</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    {analysisData.sentiment_analysis.key_headlines.map((item, index) => (<li key={index} className="flex items-start"><span className={`mr-2 ${item.type === '+' ? 'text-green-400' : 'text-red-400'}`}>{item.type}</span><span>{item.text}</span></li>))}
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-4">Risk Breakdown</h3>
                  <div className="space-y-3 text-sm">{Object.entries(analysisData.risk_breakdown).map(([key, value]) => (<div key={key}><div className="flex justify-between capitalize mb-1"><span>{key.replace('_', ' ')}</span><span>{(value*100).toFixed(0)}%</span></div><div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${value * 100}%` }}></div></div></div>))}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}