import pandas as pd
from django.core.management.base import BaseCommand
from news.models import FinancialNews

# Zimbabwe-related keywords
KEYWORDS = [
    "Zimbabwe", "ZSE", "Harare",
    "Econet", "Delta", "CBZ", "OK Zimbabwe", "Innscor", "seedco", "Petrotrade"
]


def detect_stock(headline):

    headline = headline.lower()

    if "econet" in headline:
        return "ECO"
    elif "delta" in headline:
        return "DLTA"
    elif "cbz" in headline:
        return "CBZ"
    elif "ok zimbabwe" in headline or "okz" in headline:
        return "OKZ"
    elif "innscor" in headline:
        return "INN"
    else:
        return "ZSE"

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        try:
            df = pd.read_csv('datasets/financial_news.csv', sep='\t', on_bad_lines='skip', encoding='utf-8')
        except TypeError:
            # Fallback for older pandas versions
            df = pd.read_csv('datasets/financial_news.csv', sep='\t', error_bad_lines=False, encoding='utf-8')

        from django.utils import timezone
        for _, row in df.iterrows():

            headline = str(row.get('Sentence', row.get('headline', '')))

            # Filter only Zimbabwe-related news
            if any(keyword.lower() in headline.lower() for keyword in KEYWORDS):

                FinancialNews.objects.create(
                    stock_symbol=detect_stock(headline),
                    headline=headline,
                    source=row.get('source', 'dataset'),
                    published_date=row.get('published_date', timezone.now().date())
                )

        self.stdout.write(self.style.SUCCESS('Filtered Zimbabwe news imported'))