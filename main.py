# main.py
# Backend for the RapidRisk Financial Analysis Tool

import datetime
import os
import requests # Using requests for the new search function
from dotenv import load_dotenv
from alpha_vantage.timeseries import TimeSeries
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

# --- Load Environment Variables ---
load_dotenv()

# --- Pydantic Models ---

class MarketData(BaseModel):
    ticker: str
    company_name: str
    current_price: float
    price_change_24h: float
    price_change_24h_percent: float
    market_cap: str
    volume: str

# NEW: Pydantic model for search results
class SearchResult(BaseModel):
    symbol: str
    name: str
    region: str
    currency: str

class SentimentAnalysis(BaseModel):
    overall_sentiment_score: float
    sentiment_label: str
    positive_percent: float
    neutral_percent: float
    negative_percent: float
    key_headlines: List[Dict[str, str]]

class Predictions(BaseModel):
    risk_model: str
    one_week_prediction: float
    one_month_prediction: float
    one_year_prediction: float

class RiskBreakdown(BaseModel):
    market_volatility: float
    macroeconomic: float
    news_sentiment: float
    regulatory: float

class ComprehensiveAnalysis(BaseModel):
    credit_rating: str
    credit_rating_outlook: str
    market_data: MarketData
    sentiment_analysis: SentimentAnalysis
    predictions: Predictions
    risk_breakdown: RiskBreakdown
    analysis_timestamp: datetime.datetime

# --- Data Fetching & Search Functions ---

def fetch_market_data_from_api(ticker: str) -> MarketData:
    # ... (this function is unchanged from the previous version)
    api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    if not api_key:
        raise ConnectionError("Alpha Vantage API key not found in .env file.")
    try:
        ts = TimeSeries(key=api_key, output_format='json')
        quote_data, _ = ts.get_quote_endpoint(symbol=ticker)
        if not quote_data:
            raise ValueError(f"Ticker '{ticker}' not found or no data available from Alpha Vantage.")
        price_str = quote_data.get('05. price', '0')
        change_str = quote_data.get('09. change', '0')
        change_percent_str = quote_data.get('10. change percent', '0%')
        volume_str = quote_data.get('06. volume', '0')
        return MarketData(
            ticker=quote_data.get('01. symbol', ticker.upper()),
            company_name="N/A", # Placeholder
            current_price=float(price_str),
            price_change_24h=float(change_str),
            price_change_24h_percent=float(change_percent_str.replace('%', '')),
            market_cap="N/A", # Placeholder
            volume=volume_str
        )
    except Exception as e:
        if "Thank you for using Alpha Vantage!" in str(e):
             raise ValueError(f"Invalid API call for {ticker}. Check ticker symbol or API plan limits.")
        raise RuntimeError(f"An error occurred with the Alpha Vantage API: {e}")

# NEW: Function to search for ticker symbols
def search_for_symbol(query: str) -> List[SearchResult]:
    """
    Searches for stock symbols using the Alpha Vantage SYMBOL_SEARCH endpoint.
    """
    api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    if not api_key:
        raise ConnectionError("Alpha Vantage API key not found in .env file.")
    
    url = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if 'bestMatches' not in data:
            return [] # Return empty list if no matches found
        
        results = []
        for match in data['bestMatches']:
            results.append(SearchResult(
                symbol=match.get('1. symbol'),
                name=match.get('2. name'),
                region=match.get('4. region'),
                currency=match.get('8. currency')
            ))
        return results
    except Exception as e:
        raise RuntimeError(f"An error occurred during symbol search: {e}")


# --- Initialize FastAPI App (Unchanged) ---
app = FastAPI(title="RapidRisk API", description="Provides financial analysis...")
origins = ["http://localhost:3000"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


# --- API Endpoints ---

# NEW: Endpoint for symbol search
@app.get("/api/search/{query}", response_model=List[SearchResult])
async def search_symbols(query: str):
    """
    Endpoint to search for stock symbols by name or ticker.
    """
    try:
        return search_for_symbol(query)
    except (ConnectionError, RuntimeError) as e:
        raise HTTPException(status_code=500, detail=str(e))

# Main analysis endpoint (Unchanged)
@app.get("/api/analyze/{ticker}", response_model=ComprehensiveAnalysis)
async def analyze_ticker(ticker: str, risk_model: str = "Moderate"):
    """
    Performs a comprehensive financial analysis for a given stock ticker.
    """
    print(f"Received request for {ticker} with {risk_model} risk model...")
    try:
        live_market_data = fetch_market_data_from_api(ticker)
        
        analysis_result = ComprehensiveAnalysis(
            credit_rating="AA+",
            credit_rating_outlook="Stable",
            market_data=live_market_data,
            sentiment_analysis=SentimentAnalysis(
                overall_sentiment_score=0.71,
                sentiment_label="Positive",
                positive_percent=0.71,
                neutral_percent=0.19,
                negative_percent=0.10,
                key_headlines=[
                    {'type': '+', 'text': 'Placeholder positive headline.'},
                    {'type': '-', 'text': 'Placeholder negative headline.'}
                ]
            ),
            predictions=Predictions(
                risk_model=risk_model,
                one_week_prediction=197.50,
                one_month_prediction=204.10,
                one_year_prediction=225.00
            ),
            risk_breakdown=RiskBreakdown(
                market_volatility=0.6,
                macroeconomic=0.8,
                news_sentiment=0.4,
                regulatory=0.9
            ),
            analysis_timestamp=datetime.datetime.now()
        )
        return analysis_result
    except (ValueError, ConnectionError, RuntimeError) as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {e}")