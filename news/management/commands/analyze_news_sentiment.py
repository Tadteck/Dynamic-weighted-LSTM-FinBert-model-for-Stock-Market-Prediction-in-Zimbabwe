from django.core.management.base import BaseCommand
from news.models import FinancialNews
from ai_services.finbert_service import analyze_sentiment


class Command(BaseCommand):
    help = "Analyze sentiment for financial news"

    def handle(self, *args, **kwargs):

        news_items = FinancialNews.objects.filter(sentiment_score__isnull=True)

        for news in news_items:

            sentiment, score = analyze_sentiment(news.headline)

            if sentiment == "positive":
                news.sentiment_score = score
            elif sentiment == "negative":
                news.sentiment_score = -score
            else:
                news.sentiment_score = 0

            news.save()

            print(f"Processed: {news.headline}")

        self.stdout.write(self.style.SUCCESS("Sentiment analysis completed"))