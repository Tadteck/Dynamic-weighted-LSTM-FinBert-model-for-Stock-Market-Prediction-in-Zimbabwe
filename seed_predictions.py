import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_prediction.settings')
django.setup()

from prediction.models import Prediction
from stocks.models import StockPrice
from news.models import FinancialNews
from ai_services.prediction_service import predict_next_price
from ai_services.dynamic_weighting import combine_predictions
from ai_services.xai_service import generate_explanation

SYMBOLS = ['ZSE:DLTA.zw', 'ZSE:ECO.zw', 'ZSE:INN.zw', 'ZSE:NMB.zw', 'ZSE:CBZ.zw', 'ZSE:TNCI.zw', 'ZSE:RTG.zw', 'ZSE:FBC.zw', 'ZSE:ZBFH.zw', 'ZSE:FML.zw']

for symbol in SYMBOLS:
    print(f"Generating prediction for {symbol}...")
    prices = list(StockPrice.objects.filter(stock_symbol=symbol).order_by('-date')[:5])[::-1]
    
    if len(prices) < 5:
        print(f"Skipping {symbol}, not enough data.")
        continue

    sentiment = FinancialNews.objects.filter(stock_symbol=symbol).order_by('-published_date').first()
    sentiment_score = sentiment.sentiment_score if (sentiment and sentiment.sentiment_score is not None) else 0

    data = []
    for price in prices:
        data.append([float(price.close_price), float(sentiment_score)])

    try:
        lstm_pred = predict_next_price(data, symbol)
        final_pred = combine_predictions(lstm_pred, sentiment_score)
        
        close_price = prices[-1].close_price
        
        # Don't strictly need to create with explanation, but we create the Prediction record
        # so frontend fetches it via get_predictions and Serializer adds explanation.
        Prediction.objects.create(
            stock_symbol=symbol,
            lstm_prediction=lstm_pred,
            sentiment_score=sentiment_score,
            final_prediction=final_pred
        )
        print(f"-> Success for {symbol}")
    except Exception as e:
        print(f"-> Failed for {symbol}: {e}")

print(f"Total Predictions now in DB: {Prediction.objects.count()}")
