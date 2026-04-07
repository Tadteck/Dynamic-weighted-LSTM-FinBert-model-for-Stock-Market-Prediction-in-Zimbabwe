import torch
import numpy as np
import joblib
import os
from ai_services.lstm_model import LSTMModel
from ai_services.data_preparation import prepare_training_data
from stocks.models import StockPrice

ML_MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ML_models')

def train_model():
    symbols = StockPrice.objects.values_list('stock_symbol', flat=True).distinct()
    
    if not symbols:
        print("No stock data found in DB. Run seed_historical_data first.")
        return

    for symbol in symbols:
        print(f"\n--- Training model for {symbol} ---")
        data, scaler = prepare_training_data(symbol)
        
        if data is None or len(data) < 10:
            print(f"Not enough data for {symbol}, skipping.")
            continue

        X = []
        y = []
        sequence_length = 5

        for i in range(len(data) - sequence_length):
            X.append(data[i:i+sequence_length])
            y.append(data[i+sequence_length][0])

        X = torch.tensor(np.array(X), dtype=torch.float32)
        y = torch.tensor(np.array(y), dtype=torch.float32)

        model = LSTMModel()
        criterion = torch.nn.MSELoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

        for epoch in range(20):
            output = model(X)
            loss = criterion(output.squeeze(), y)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            if (epoch+1) % 5 == 0:
                print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")

        safe_symbol = symbol.replace(':', '_').replace('.', '_')
        os.makedirs(ML_MODELS_DIR, exist_ok=True)
        torch.save(model.state_dict(), os.path.join(ML_MODELS_DIR, f"lstm_stock_model_{safe_symbol}.pth"))
        joblib.dump(scaler, os.path.join(ML_MODELS_DIR, f"scaler_{safe_symbol}.pkl"))
        print(f"Saved artifacts for {symbol}")

    print("\nAll models training completed.")