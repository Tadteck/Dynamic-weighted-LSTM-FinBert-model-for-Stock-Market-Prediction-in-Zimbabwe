from rest_framework import serializers

class PredictionRequestSerializer(serializers.Serializer):
    stock_symbol = serializers.CharField(max_length=10)