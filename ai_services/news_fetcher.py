import requests
from news.models import FinancialNews
from datetime import datetime

API_KEY = "62bdd9db4a2e4de19c5916767473dbd2"

COMPANY_QUERIES = {
    'ZSE:DLTA.zw': 'Delta Corporation Zimbabwe',
    'ZSE:ECO.zw': 'Econet Wireless Zimbabwe',
    'ZSE:INN.zw': 'Innscor Africa Zimbabwe',
    'ZSE:NMB.zw': 'NMB Bank Zimbabwe',
    'ZSE:CBZ.zw': 'CBZ Holdings Zimbabwe',
    'ZSE:TNCI.zw': 'TNCI Zimbabwe',
    'ZSE:RTG.zw': 'Rainbow Tourism Group Zimbabwe',
    'ZSE:FBC.zw': 'FBC Holdings Zimbabwe',
    'ZSE:ZBFH.zw': 'ZB Financial Holdings Zimbabwe',
    'ZSE:FML.zw': 'First Mutual Holdings Zimbabwe',
}

def fetch_financial_news():
    for symbol, query in COMPANY_QUERIES.items():
        url = f"https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}"
        
        try:
            response = requests.get(url)
            data = response.json()
            
            if "articles" in data:
                articles = data["articles"]
                for article in articles:
                    FinancialNews.objects.create(
                        stock_symbol=symbol,
                        headline=article.get("title", ""),
                        source=article.get("source", {}).get("name", "Unknown"),
                        published_date=datetime.now()
                    )
        except Exception as e:
            print(f"Error fetching news for {query}: {e}")