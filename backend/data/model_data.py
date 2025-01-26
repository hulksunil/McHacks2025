import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder


def get_stock_data():
    current_folder = os.path.dirname(__file__)
    training_data_folder = os.path.join(current_folder, "..", "TrainingData", "TrainingData", "Period1")
    training_data_folder = os.path.abspath(training_data_folder)

    all_market_data = []  # List to hold all market data across stocks
    all_trade_data = []   # List to hold all trade data across stocks

    if os.path.exists(training_data_folder):
        for stock_folder in os.listdir(training_data_folder):
            stock_folder_path = os.path.join(training_data_folder, stock_folder)

            if os.path.isdir(stock_folder_path):
                expected_columns_market = ['bidVolume', 'bidPrice', 'askVolume', 'askPrice', 'timestamp']

                for file_name in os.listdir(stock_folder_path):
                    file_path = os.path.join(training_data_folder, stock_folder, file_name)
                    
                    if file_name.endswith('.csv'):
                        if 'market_data' in file_name:
                            try:
                                df = pd.read_csv(file_path, names=expected_columns_market, header=0)
                            except:
                                df = pd.read_csv(file_path, names=expected_columns_market, header=None)
                            df['stock_name'] = stock_folder  # Add stock name as a field
                            all_market_data.append(df)

                        elif 'trade_data' in file_name:
                            df = pd.read_csv(file_path)
                            df['stock_name'] = stock_folder  # Add stock name as a field
                            all_trade_data.append(df)

    # Combine all market and trade data
    combined_market_data = pd.concat(all_market_data, ignore_index=True)
    combined_trade_data = pd.concat(all_trade_data, ignore_index=True)

    # Process market data
    combined_market_data['timestamp'] = pd.to_datetime(combined_market_data['timestamp'], format='%H:%M:%S.%f')
    combined_market_data = combined_market_data.set_index('timestamp')


    combined_market_data['spread'] = abs(combined_market_data['askPrice'] - combined_market_data['bidPrice'])
    combined_market_data['midPrice'] = (combined_market_data['bidPrice'] + combined_market_data['askPrice']) / 2
    combined_market_data['std_30s'] = combined_market_data['midPrice'].rolling('30s', min_periods=30).std()
    combined_market_data['std_60s'] = combined_market_data['midPrice'].rolling('60s', min_periods=60).std()
    combined_market_data['imbalance'] = (combined_market_data['bidVolume'] - combined_market_data['askVolume']) / (
        combined_market_data['bidVolume'] + combined_market_data['askVolume'])
    combined_market_data['price_change'] = combined_market_data['midPrice'].diff().fillna(0)
    combined_market_data['label'] = 0  # Placeholder for labels

    # Reset the index and ensure all fields are included
    required_fields = ['timestamp', 'stock_name', 'bidPrice', 'askPrice', 'bidVolume', 'askVolume', 
                       'spread', 'midPrice', 'imbalance', 'price_change', 'label']
    combined_market_data = combined_market_data.reset_index().reindex(columns=required_fields)

    # Return combined data
    return {
        'market_data': combined_market_data,
        'trade_data': combined_trade_data
    }

# Example usage
data = get_stock_data()
print(data['market_data'].head())
