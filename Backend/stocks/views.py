from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StockPrice
from .serializers import StockPriceSerializer


@api_view(['GET'])
def get_stocks(request):

    stocks = StockPrice.objects.all().order_by('-date')[:50]
    serializer = StockPriceSerializer(stocks, many=True)

    return Response(serializer.data)