import pandas as pd
import os

def get_stock_data():
    # Get the current folder path
    current_folder = os.path.dirname(__file__)
    # Construct the path to TrainingData/Period1
    training_data_folder = os.path.join(current_folder, "..", "TrainingData", "TrainingData", "Period1")
    # Resolve the path to an absolute path
    training_data_folder = os.path.abspath(training_data_folder)


    # Dictionary to store DataFrames for market and trade data for each stock
    stock_data = {}

    if os.path.exists(training_data_folder):
        # Iterate over subfolders (A, B, C, D, E)
        for stock_folder in os.listdir(training_data_folder):
            stock_folder_path = os.path.join(training_data_folder, stock_folder)
            
            if os.path.isdir(stock_folder_path):
                # Initialize data storage for this stock
                stock_data[stock_folder] = {
                    'market_data': [],
                    'trade_data': []
                }
                expected_columns_market = ['bidVolume', 'bidPrice', 'askVolume', 'askPrice', 'timestamp']

                # Iterate over files in the stock folder
                for file_name in os.listdir(stock_folder_path):
                    file_path = os.path.join(stock_folder_path, file_name)
                    
                    if file_name.endswith('.csv'):
                        if 'market_data' in file_name:
                            try:
                                df = pd.read_csv(file_path, names=expected_columns_market, header=0)  # Assume headers exist
                            except:
                                df = pd.read_csv(file_path, names=expected_columns_market, header=None)
                            stock_data[stock_folder]['market_data'].append(df)

                        elif 'trade_data' in file_name:
                            stock_data[stock_folder]['trade_data'].append(pd.read_csv(file_path))


    # Combine the data for each stock
    for stock, datasets in stock_data.items():
        # Combine market data files
        if datasets['market_data']:
            stock_data[stock]['market_data'] = pd.concat(datasets['market_data'], ignore_index=True)
        else:
            stock_data[stock]['market_data'] = pd.DataFrame()
        
        # Combine trade data files
        if datasets['trade_data']:
            stock_data[stock]['trade_data'] = pd.concat(datasets['trade_data'], ignore_index=True)
        else:
            stock_data[stock]['trade_data'] = pd.DataFrame()
        
    #     print(f"Loaded data for stock {stock}:")
    #     print(f" - Market data: {stock_data[stock]['market_data'].shape} rows")
    #     print(f" - Trade data: {stock_data[stock]['trade_data'].shape} rows")

    # Example: Accessing data for stock 'A'



    #converting timestamps and adding extra columns
    for stock in stock_data:
        market_data = stock_data[stock]['market_data']
        trade_data = stock_data[stock]['trade_data']
        
        market_data['timestamp'] = pd.to_datetime(market_data['timestamp'], format='%H:%M:%S.%f')
        trade_data['timestamp'] = pd.to_datetime(trade_data['timestamp'], format='%H:%M:%S.%f')
        
        market_data = market_data.set_index('timestamp')
        market_data = market_data.resample('1s').mean()
        market_data = market_data.fillna(0)

        market_data = market_data[(market_data['bidPrice'] != 0) & (market_data['askPrice'] != 0)]

        #getting spread
        market_data['spread'] = abs(market_data['askPrice'] - market_data['bidPrice'])
        
        #getting mid+price
        market_data['midPrice'] = (market_data['bidPrice'] + market_data['askPrice']) / 2


        market_data['std_30s'] = market_data['midPrice'].rolling('30s', min_periods=30).std()
        market_data['std_60s'] = market_data['midPrice'].rolling('60s', min_periods=60).std()
        
        market_data = market_data.fillna(0)
        stock_data[stock]['market_data'] = market_data
        
    # if 'A' in stock_data:
    #     print("Market Data for Stock A:")
    #     print(stock_data['A']['market_data'].head(40))
    #     print("Trade Data for Stock A:")
    #     print(stock_data['A']['trade_data'].head())
    
    data_to_dict(stock_data)
    
    return stock_data


def data_to_dict(stock_data):
    for stock in stock_data:
        stock_data[stock]['market_data'] = stock_data[stock]['market_data'].to_dict(orient='records')
        stock_data[stock]['trade_data'] = stock_data[stock]['trade_data'].to_dict(orient='records')
    return stock_data
    
