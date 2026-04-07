import torch
import torch.nn as nn

class LSTMModel(nn.Module):

    def __init__(self, input_size=2, hidden_size=50, num_layers=2):
        super(LSTMModel, self).__init__()

        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):

        output, _ = self.lstm(x)
        output = output[:, -1, :]
        prediction = self.fc(output)

        return prediction