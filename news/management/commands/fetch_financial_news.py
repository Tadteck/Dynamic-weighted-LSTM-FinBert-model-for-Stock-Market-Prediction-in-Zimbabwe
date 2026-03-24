from django.core.management.base import BaseCommand
from ai_services.news_fetcher import fetch_financial_news


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        fetch_financial_news()

        print("Financial news fetched successfully")