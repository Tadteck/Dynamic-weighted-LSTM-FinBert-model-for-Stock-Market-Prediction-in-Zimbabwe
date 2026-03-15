import torch
import numpy as np
import joblib
import os
from ai_services.lstm_model import LSTMModel

model = LSTMModel()
if os.path.exists("lstm_stock_model.pth"):
    model.load_state_dict(torch.load("lstm_stock_model.pth"))
model.eval()

scaler = None
if os.path.exists("scaler.pkl"):
    scaler = joblib.load("scaler.pkl")

def predict_next_price(data):
    if scaler:
        # Scale the historical input data
        scaled_data = scaler.transform(data)
    else:
        scaled_data = data

    input_tensor = torch.tensor(np.array([scaled_data]), dtype=torch.float32)

    with torch.no_grad():
        prediction = model(input_tensor)

    pred_val = float(prediction)

    if scaler:
        # Inverse transform: the model outputs just the close_price, so we need a dummy array to match scaler's features (2 features: close_price, sentiment_score)
        dummy = np.zeros((1, 2))
        dummy[0, 0] = pred_val
        inversed = scaler.inverse_transform(dummy)
        pred_val = float(inversed[0, 0])

    return pred_val