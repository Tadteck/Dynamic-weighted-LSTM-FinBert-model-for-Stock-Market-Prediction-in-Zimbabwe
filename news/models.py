from django.db import models

class FinancialNews(models.Model):
    stock_symbol = models.CharField(max_length=10)
    headline = models.TextField()
    source = models.CharField(max_length=100)
    published_date = models.DateField()
    sentiment_score = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.headline