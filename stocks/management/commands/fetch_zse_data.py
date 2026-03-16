from django.core.management.base import BaseCommand
from ai_services.zse_fetcher import fetch_zse_data


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        fetch_zse_data()

        print("ZSE data updated successfully")