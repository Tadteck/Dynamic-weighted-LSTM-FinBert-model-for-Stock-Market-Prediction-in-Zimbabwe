import torch
import numpy as np
from ai_services.lstm_model import LSTMModel

model = LSTMModel()
model.load_state_dict(torch.load("lstm_stock_model.pth"))
model.eval()

def predict_next_price(data):

    data = torch.tensor(np.array([data]), dtype=torch.float32)

    with torch.no_grad():
        prediction = model(data)

    return float(prediction)