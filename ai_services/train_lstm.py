import torch
import numpy as np
import joblib
from ai_services.lstm_model import LSTMModel
from ai_services.data_preparation import prepare_training_data

def train_model():

    data, scaler = prepare_training_data()

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

        print(f"Epoch {epoch+1}, Loss: {loss.item()}")

    torch.save(model.state_dict(), "lstm_stock_model.pth")
    joblib.dump(scaler, "scaler.pkl")

    print("Model training completed")