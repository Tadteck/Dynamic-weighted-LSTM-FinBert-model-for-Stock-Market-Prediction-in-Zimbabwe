import requests
from news.models import FinancialNews
from datetime import datetime

API_KEY = "62bdd9db4a2e4de19c5916767473dbd2"


def fetch_financial_news():

    url = f"https://newsapi.org/v2/everything?q=Zimbabwe stock market&apiKey={API_KEY}"

    response = requests.get(url)
    data = response.json()

    articles = data["articles"]

    for article in articles:

        FinancialNews.objects.create(
            stock_symbol="ZSE",
            headline=article["title"],
            source=article["source"]["name"],
            published_date=datetime.now()
        )