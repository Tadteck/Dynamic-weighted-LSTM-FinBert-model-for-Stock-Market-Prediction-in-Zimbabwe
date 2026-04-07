import torch
import numpy as np
import joblib
import os
from ai_services.lstm_model import LSTMModel

ML_MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ML_models')

def predict_next_price(data, stock_symbol="ZSE:DLTA.zw"):
    safe_symbol = stock_symbol.replace(':', '_').replace('.', '_')
    model_path = os.path.join(ML_MODELS_DIR, f"lstm_stock_model_{safe_symbol}.pth")
    scaler_path = os.path.join(ML_MODELS_DIR, f"scaler_{safe_symbol}.pkl")

    model = LSTMModel()
    if os.path.exists(model_path):
        model.load_state_dict(torch.load(model_path))
    elif os.path.exists(os.path.join(ML_MODELS_DIR, "lstm_stock_model.pth")):
        # Fallback to general model if distinct is missing
        model.load_state_dict(torch.load(os.path.join(ML_MODELS_DIR, "lstm_stock_model.pth")))
    model.eval()

    scaler = None
    if os.path.exists(scaler_path):
        scaler = joblib.load(scaler_path)
    elif os.path.exists(os.path.join(ML_MODELS_DIR, "scaler.pkl")):
        scaler = joblib.load(os.path.join(ML_MODELS_DIR, "scaler.pkl"))

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
        # Inverse transform: model outputs close_price, use dummy array to match scaler's features (2: close_price, sentiment_score)
        dummy = np.zeros((1, 2))
        dummy[0, 0] = pred_val
        inversed = scaler.inverse_transform(dummy)
        pred_val = float(inversed[0, 0])

    return pred_val