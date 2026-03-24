from django.core.management.base import BaseCommand
from ai_services.zim_news_scraper import fetch_herald_news


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        fetch_herald_news()

        print("Zimbabwe news fetched successfully")