import requests
from bs4 import BeautifulSoup
from news.models import FinancialNews
from datetime import datetime


def fetch_herald_news():

    url = "https://www.herald.co.zw/category/business/"

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    articles = soup.find_all("h3")

    for article in articles:

        headline = article.text.strip()

        if headline:

            FinancialNews.objects.create(
                stock_symbol="ZSE",
                headline=headline,
                source="The Herald",
                published_date=datetime.now()
            )