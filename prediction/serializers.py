from rest_framework import serializers
from .models import Prediction
from ai_services.xai_service import generate_explanation

class PredictionSerializer(serializers.ModelSerializer):
    explanation = serializers.SerializerMethodField()

    class Meta:
        model = Prediction
        fields = '__all__'

    def get_explanation(self, obj):
        return generate_explanation(
            stock_symbol=obj.stock_symbol,
            lstm_prediction=obj.lstm_prediction,
            sentiment_score=obj.sentiment_score,
            final_prediction=obj.final_prediction
        )