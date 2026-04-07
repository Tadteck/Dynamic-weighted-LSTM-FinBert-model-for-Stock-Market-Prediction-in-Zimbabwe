from django.urls import path
from .views import get_stocks

urlpatterns = [
    path('', get_stocks),
]