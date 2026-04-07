import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from stocks.models import StockPrice
from news.models import FinancialNews

def prepare_training_data(symbol='ZSE:DLTA.zw'):

    stocks = list(StockPrice.objects.filter(stock_symbol=symbol).order_by('date').values())
    news = list(FinancialNews.objects.filter(stock_symbol=symbol).values())

    stock_df = pd.DataFrame(stocks)
    news_df = pd.DataFrame(news)
    
    if stock_df.empty:
        return None, None

    if not news_df.empty:
        merged = pd.merge(
            stock_df,
            news_df[['stock_symbol','published_date','sentiment_score']],
            left_on=['stock_symbol','date'],
            right_on=['stock_symbol','published_date'],
            how='left'
        )
    else:
        merged = stock_df.copy()
        if 'sentiment_score' not in merged.columns:
            merged['sentiment_score'] = 0.0

    merged['sentiment_score'] = merged['sentiment_score'].fillna(0)

    # Average sentiment if multiple news articles break on the same day, keeping close_price same
    merged = merged.groupby(['date', 'close_price'])['sentiment_score'].mean().reset_index()
    merged = merged.sort_values('date')

    features = merged[['close_price','sentiment_score']]

    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(features)

    return scaled, scaler