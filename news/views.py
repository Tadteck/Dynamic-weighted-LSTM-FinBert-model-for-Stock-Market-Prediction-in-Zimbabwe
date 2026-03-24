from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import FinancialNews
from .serializers import NewsSerializer


@api_view(['GET'])
def get_news(request):

    news = FinancialNews.objects.all().order_by('-published_date')[:50]
    serializer = NewsSerializer(news, many=True)

    return Response(serializer.data)