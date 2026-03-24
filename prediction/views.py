from rest_framework.decorators import api_view
from rest_framework.response import Response
from stocks.models import StockPrice
from news.models import FinancialNews
from ai_services.prediction_service import predict_next_price
from ai_services.dynamic_weighting import combine_predictions
from prediction.models import Prediction
from .serializers import PredictionSerializer
from ratelimit.decorators import ratelimit


@ratelimit(key='ip', rate='10/m', block=True)
@api_view(['POST'])
def predict_stock(request):

    stock_symbol = request.data.get("stock_symbol")

    if not stock_symbol:
        return Response({"error": "Stock symbol required"})

    prices = StockPrice.objects.filter(
        stock_symbol=stock_symbol
    ).order_by('-date')[:5]

    if len(prices) < 5:
        return Response({
            "error": "Not enough stock data to make prediction"
        })

    prices = list(prices)[::-1]

    sentiment = FinancialNews.objects.filter(
        stock_symbol=stock_symbol
    ).order_by('-published_date').first()

    sentiment_score = sentiment.sentiment_score if (sentiment and sentiment.sentiment_score is not None) else 0

    data = []

    for price in prices:
        data.append([
            float(price.close_price),
            float(sentiment_score)
        ])

    lstm_prediction = predict_next_price(data)

    final_prediction = combine_predictions(
        lstm_prediction,
        sentiment_score
    )

    Prediction.objects.create(
        stock_symbol=stock_symbol,
        lstm_prediction=lstm_prediction,
        sentiment_score=sentiment_score,
        final_prediction=final_prediction
    )

    return Response({
        "stock": stock_symbol,
        "lstm_prediction": lstm_prediction,
        "sentiment_score": sentiment_score,
        "final_prediction": final_prediction
    })


@api_view(['GET'])
def get_predictions(request):

    preds = Prediction.objects.all().order_by('-created_at')[:50]
    serializer = PredictionSerializer(preds, many=True)

    return Response(serializer.data)