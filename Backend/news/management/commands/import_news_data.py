import pandas as pd
from django.core.management.base import BaseCommand
from news.models import FinancialNews
from django.utils import timezone
from datetime import datetime

def detect_stock(headline):
    headline = headline.lower()
    if "econet" in headline: return "ZSE:ECO.zw"
    elif "delta" in headline: return "ZSE:DLTA.zw"
    elif "cbz" in headline: return "ZSE:CBZ.zw"
    elif "innscor" in headline: return "ZSE:INN.zw"
    elif "nmb" in headline: return "ZSE:NMB.zw"
    elif "fbc" in headline: return "ZSE:FBC.zw"
    elif "zb " in headline or "zb financial" in headline: return "ZSE:ZBFH.zw"
    elif "first mutual" in headline or "fml" in headline: return "ZSE:FML.zw"
    elif "rainbow tourism" in headline or "rtg" in headline: return "ZSE:RTG.zw"
    elif "tnci" in headline: return "ZSE:TNCI.zw"
    else: return "ZSE:DLTA.zw"

class Command(BaseCommand):
    help = 'Imports realistic ZSE financial news from CSV'

    def handle(self, *args, **kwargs):
        try:
            df = pd.read_csv('datasets/zse_financial_news.csv', sep=',')
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error reading CSV: {e}"))
            return

        for _, row in df.iterrows():
            headline = str(row.get('headline', ''))
            
            # Use provided sentiment_score
            sentiment_score = None
            if pd.notna(row.get('sentiment_score')):
                try:
                    sentiment_score = float(row.get('sentiment_score'))
                except ValueError:
                    sentiment_score = None

            FinancialNews.objects.create(
                stock_symbol=detect_stock(headline),
                headline=headline,
                source=row.get('source', 'Local Media'),
                published_date=row.get('published_date', timezone.now().date()),
                sentiment_score=sentiment_score
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported realistic ZSE news data!'))