from news.models import FinancialNews

def generate_explanation(stock_symbol, lstm_prediction, sentiment_score, final_prediction, close_price=None):
    company_name = stock_symbol.split(':')[1].split('.')[0] if ':' in stock_symbol else stock_symbol
    
    # 1. Historical Pattern
    hist_trend = "a stable"
    if close_price:
        diff = lstm_prediction - float(close_price)
        pct = (diff / float(close_price)) * 100
        if pct > 0.5:
            hist_trend = f"an upward (+{pct:.1f}%)"
        elif pct < -0.5:
            hist_trend = f"a downward ({pct:.1f}%)"
            
    # 2. Sentiment Impact
    sentiment_str = "neutral"
    if sentiment_score > 0.4:
        sentiment_str = "highly positive"
    elif sentiment_score > 0.05:
        sentiment_str = "positive"
    elif sentiment_score < -0.4:
        sentiment_str = "highly negative"
    elif sentiment_score < -0.05:
        sentiment_str = "negative"

    # Fetch real-world trigger (News Headline)
    news_trigger = "recent market activity"
    try:
        latest_news = FinancialNews.objects.filter(stock_symbol=stock_symbol).order_by('-published_date').first()
        if latest_news and latest_news.headline:
            news_trigger = f"the news headline \"{latest_news.headline}\" reported by {latest_news.source}"
    except Exception:
        pass

    # 3. Dynamic Weighting Override
    override_pct = 0.0
    if lstm_prediction and lstm_prediction != 0:
        override_pct = ((final_prediction - lstm_prediction) / lstm_prediction) * 100

    shift_dir = "positive override" if override_pct >= 0 else "negative override"

    # Assemble XAI reasoning
    explanation = (
        f"The prediction AI established a base LSTM forecast of ZIG {lstm_prediction:.2f} for {company_name} based on its historical {hist_trend} price pattern. "
        f"Simultaneously, the sentiment algorithm detected a {sentiment_str} (score: {sentiment_score:.2f}) market shift driven by {news_trigger}. "
        f"Reacting to this real-world event, the dynamic model applied a {shift_dir} of {override_pct:+.1f}%, correcting the final Target Price to ZIG {final_prediction:.2f}."
    )
    
    return explanation
