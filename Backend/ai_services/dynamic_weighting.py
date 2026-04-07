def calculate_weights(sentiment_score):

    sentiment_strength = abs(sentiment_score)

    # If sentiment is strong → increase its weight
    if sentiment_strength > 0.6:
        sentiment_weight = 0.4
        price_weight = 0.6

    elif sentiment_strength > 0.3:
        sentiment_weight = 0.3
        price_weight = 0.7

    else:
        sentiment_weight = 0.2
        price_weight = 0.8

    return price_weight, sentiment_weight

def combine_predictions(lstm_prediction, sentiment_score):

    price_weight, sentiment_weight = calculate_weights(sentiment_score)

    final_prediction = (
        (lstm_prediction * price_weight) +
        (lstm_prediction * sentiment_score * sentiment_weight)
    )

    return final_prediction    