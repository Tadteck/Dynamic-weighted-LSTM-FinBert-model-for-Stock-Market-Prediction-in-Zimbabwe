from django.db import models

class StockPrice(models.Model):
    stock_symbol = models.CharField(max_length=20)
    date = models.DateField()
    open_price = models.FloatField()
    high_price = models.FloatField()
    low_price = models.FloatField()
    close_price = models.FloatField()
    volume = models.BigIntegerField()

    def __str__(self):
        return f"{self.stock_symbol} - {self.date}"