from django.db import models

class Prediction(models.Model):
    stock_symbol = models.CharField(max_length=10)
    lstm_prediction = models.FloatField()
    sentiment_score = models.FloatField()
    final_prediction = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)