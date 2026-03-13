import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from stocks.models import StockPrice
from news.models import FinancialNews

def prepare_training_data():

    stocks = StockPrice.objects.all().values()
    news = FinancialNews.objects.all().values()

    stock_df = pd.DataFrame(stocks)
    news_df = pd.DataFrame(news)

    merged = pd.merge(
        stock_df,
        news_df[['stock_symbol','published_date','sentiment_score']],
        left_on=['stock_symbol','date'],
        right_on=['stock_symbol','published_date'],
        how='left'
    )

    merged['sentiment_score'] = merged['sentiment_score'].fillna(0)

    features = merged[['close_price','sentiment_score']]

    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(features)

    return scaled, scaler