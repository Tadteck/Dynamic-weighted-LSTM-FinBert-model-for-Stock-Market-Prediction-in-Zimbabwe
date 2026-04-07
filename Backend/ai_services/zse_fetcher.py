import requests
from stocks.models import StockPrice
from datetime import datetime


def fetch_zse_data():

    url = "https://afristox.com/api/exchanges/zse"

    response = requests.get(url)
    data = response.json()

    for stock in data["stocks"]:

        StockPrice.objects.create(
            stock_symbol=stock["symbol"],
            date=datetime.today(),
            open_price=stock["price"],
            high_price=stock["price"],
            low_price=stock["price"],
            close_price=stock["price"],
            volume=stock["volume"]
        )