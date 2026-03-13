import pandas as pd
from django.core.management.base import BaseCommand
from news.models import FinancialNews

class Command(BaseCommand):
    help = 'Import financial news dataset'

    def handle(self, *args, **kwargs):

        df = pd.read_csv('datasets/financial_news.csv', sep='\t')
        
        # In case the columns are not exactly named 'Sentence' and 'Sentiment', we can fall back to positional indices or map them.
        # But we know they are 'Sentence' and 'Sentiment' from the file.

        for _, row in df.iterrows():
            sentiment_val = str(row.get('Sentiment', '')).strip().lower()
            if sentiment_val == 'positive':
                score = 1.0
            elif sentiment_val == 'negative':
                score = -1.0
            else:
                score = 0.0
                
            FinancialNews.objects.create(
                stock_symbol='UNKNOWN',  # No stock symbol in the dataset
                headline=row['Sentence'],
                source='Internet',       # No source provided in the dataset
                published_date='2024-01-01', # No published date provided
                sentiment_score=score
            )

        self.stdout.write(self.style.SUCCESS('News dataset imported successfully'))