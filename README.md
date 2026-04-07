Dynamic Weighted LSTM-FinBERT Model for ZSE Stock Market Prediction

An advanced, full-stack predictive AI dashboard designed to forecast stock prices for companies listed on the Zimbabwe Stock Exchange (ZSE). The application utilizes a hybrid architecture combining Long Short-Term Memory (LSTM) neural networks with FinBERT sentiment analysis to generate highly accurate, data-driven predictions.

Key Features
Hybrid Prediction Engine: Fuses historical stock price data (via LSTM) with real-time financial news sentiment (via FinBERT).
ZSE Calibration: Tailored specifically to the market dynamics and historical pricing of the Zimbabwe Stock Exchange.
Explainable AI (XAI): A dynamic reasoning engine that gives users transparent, human-readable explanations of why a stock's price is predicted to change, linking local news sentiment directly to the prediction.Modern Premium Dashboard**: A responsive, dark-themed, glassmorphic UI structured with deep visual hierarchy for financial data.
Interactive Visualizations: High-quality charts with custom gradients and tooltips using Recharts.
Secure Authentication: Fully protected backend utilizing JSON Web Tokens (JWT) for secure user sessions.

  Tech Stack

 Frontend
 Framework: React (built with Vite)
 Styling: Tailwind CSS v4
 Data Visualization: Recharts
 State Management / Routing: React Router

 Backend & AI
 Framework: Django & Django REST Framework (DRF)
 Database: PostgreSQL (for reliable, high-volume historical and sentiment data storage)
 Machine Learning: LSTM (for time-series forecasting) & FinBERT (for NLP-based financial sentiment classification)
 Authentication: JWT (Simple JWT)

Architecture Overview
1. Data Ingestion: Scraped or imported financial news strings alongside trailing ZSE stock prices.
2. Sentiment Analysis: FinBERT scores the news data (Positive, Negative, Neutral).
3. Forecasting Module: The LSTM processes the scored time-series data to predict the target price.
4. XAI Engine: Compiles the variables into a descriptive summary explaining the prediction parameters.
5. Client Access: The React frontend requests this payload securely and visualizes it onto dynamic charts and UI components.


