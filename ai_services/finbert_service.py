from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

labels = ["positive", "negative", "neutral"]

def analyze_sentiment(text):

    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model(**inputs)

    scores = torch.nn.functional.softmax(outputs.logits, dim=1)
    score = scores.detach().numpy()[0]

    sentiment_index = score.argmax()
    sentiment_label = labels[sentiment_index]

    return sentiment_label, float(score[sentiment_index])