from rest_framework import serializers
from .models import FinancialNews

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialNews
        fields = '__all__'
