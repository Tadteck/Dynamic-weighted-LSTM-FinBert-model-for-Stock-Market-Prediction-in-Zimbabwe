from django.urls import path
from .views import predict_stock, get_predictions

urlpatterns = [
    path('predict/', predict_stock),
    path('history/', get_predictions),
]