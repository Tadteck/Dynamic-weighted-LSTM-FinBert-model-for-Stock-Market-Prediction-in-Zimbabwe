from rest_framework.decorators import api_view
from rest_framework.response import Response
from stocks.models import StockPrice
from news.models import FinancialNews
from ai_services.prediction_service import predict_next_price


@api_view(['POST'])
def predict_stock(request):

    stock_symbol = request.data.get("stock_symbol")

    prices = StockPrice.objects.filter(
        stock_symbol=stock_symbol
    ).order_by('-date')[:5]

    prices = list(prices)[::-1]

    sentiment = FinancialNews.objects.filter(
        stock_symbol=stock_symbol
    ).order_by('-published_date').first()

    sentiment_score = sentiment.sentiment_score if sentiment else 0

    data = []

    if len(prices) < 5:
        return Response({"error": f"Not enough historical data for {stock_symbol} (minimum 5 days required)."}, status=400)

    for price in prices:
        data.append([
            price.close_price,
            sentiment_score
        ])

    prediction = predict_next_price(data)

    return Response({
        "stock": stock_symbol,
        "predicted_price": prediction
    })