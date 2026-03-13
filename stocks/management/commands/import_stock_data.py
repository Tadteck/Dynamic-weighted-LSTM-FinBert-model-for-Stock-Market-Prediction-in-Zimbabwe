import pandas as pd
from django.core.management.base import BaseCommand
from stocks.models import StockPrice

class Command(BaseCommand):
    help = 'Import stock dataset'

    def handle(self, *args, **kwargs):

        df = pd.read_csv('datasets/stock_prices.csv', sep='\t')
        
        def parse_val(val):
            if pd.isna(val):
                return 0.0
            if isinstance(val, str):
                val = val.replace(',', '').replace(' ', '')
                if not val or val == '-': return 0.0
            return float(val)
                
        def parse_vol(val):
            if pd.isna(val):
                return 0
            val_str = str(val).replace(',', '').upper().strip()
            if not val_str or val_str == '-': return 0
            try:
                if val_str.endswith('K'):
                    return int(float(val_str[:-1]) * 1000)
                elif val_str.endswith('M'):
                    return int(float(val_str[:-1]) * 1000000)
                elif val_str.endswith('B'):
                    return int(float(val_str[:-1]) * 1000000000)
                else:
                    return int(float(val_str))
            except ValueError:
                return 0
                
        for _, row in df.iterrows():
            StockPrice.objects.create(
                stock_symbol='UNKNOWN',
                date=pd.to_datetime(row['Date'], format='%d-%m-%y').date(),
                open_price=parse_val(row['Open']),
                high_price=parse_val(row['High']),
                low_price=parse_val(row['Low']),
                close_price=parse_val(row['Price']),
                volume=parse_vol(row['Vol.'])
            )

        self.stdout.write(self.style.SUCCESS('Stock dataset imported successfully'))