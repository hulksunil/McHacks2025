# -*- coding: utf-8 -*-
"""
### Import libraries
"""

# Import necessary libraries
import os

# Import necessary libraries for data processing
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
import numpy as np

# Import necessary libraries for model
from keras.callbacks import Callback
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense
from keras.metrics import Precision, Recall, F1Score, AUC

# Import necessary libraries for evaluation
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

"""## Directories"""

market_data_1_dir = 'market_data_A_0.csv'
market_data_2_dir = 'market_data_A_1.csv'

trade_data_dir = 'trade_data__A.csv'

Save_model_dir = 'LSTM_model'

"""# Data Preparation

### Load and merge data
"""

# Load the data from a CSV file
market_data_1 = pd.read_csv(market_data_1_dir)
market_data_2 = pd.read_csv(market_data_2_dir)
market_data = pd.concat([market_data_1, market_data_2])

# Load the trade data from a CSV file
trade_data = pd.read_csv(trade_data_dir)

# Handle the null values
market_data.dropna(subset=['timestamp'], inplace=True)
trade_data.dropna(subset=['timestamp'], inplace=True)

# Convert the 'timestamp' column into datetime
market_data['timestamp'] = pd.to_datetime(market_data['timestamp'])
trade_data['timestamp'] = pd.to_datetime(trade_data['timestamp'])

# merge the data on the nearest timestamp
merged_data = pd.merge_asof(
    market_data.sort_values('timestamp'),
    trade_data.sort_values('timestamp'),
    by='timestamp',
    direction='nearest')

"""### Feature Engineering"""

# Calculate the spread between the market and trade data
merged_data['spread'] = merged_data['askPrice'] - merged_data['bidPrice']

# Add a moving average of the spread
merged_data['bidPrice_ma'] = merged_data['bidPrice'].rolling(window=5).mean()
merged_data['askPrice_ma'] = merged_data['askPrice'].rolling(window=5).mean()
merged_data.fillna(method='bfill', inplace=True)

"""### Nomalise Features"""

# Normalize the data to a range of 0 to 1
scaler = MinMaxScaler()
features = ['bidVolume', 'bidPrice', 'askVolume', 'askPrice', 'spread', 'bidPrice_ma', 'askPrice_ma']
scaler.fit(merged_data[features])

"""### Define input and output"""

# Define timesteps
timesteps = 10

# Prepare input (x) and output (y)
x = []
y = []

for i in range(len(merged_data) - timesteps):
    x.append(merged_data[features].iloc[i:i + timesteps].values)
    y.append(merged_data['bidPrice'].iloc[i + timesteps])

x = np.array(x)
y = np.array(y)

"""### Split data"""

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

"""# Implementation of Model

### Define Model class
"""

# reshape the input data
input_shape = (x_train.shape[1], x_train.shape[2])

# define the LSTM model
model = Sequential()
model.add(LSTM(100, input_shape=input_shape, return_sequences=True))
model.add(Dense(1, activation='linear')) # TODO:Adjust the activation function to sigmoid if needed

"""### Compile model"""

# compile the model for training
model.compile(loss='mean_squared_error', optimizer='adam', metrics=['mae']) # TODO:Adjust the loss function to binary_crossentropy if needed

"""### Train and validate model"""

# # train the model
# model.fit(x_train, y_train, epochs=20, batch_size=32, validation_data=(x_test, y_test))


# Custom callback to save and print metrics at each epoch
class EpochLogger(Callback):
    def __init__(self):
        super().__init__()
        self.epochs = []

    def on_epoch_end(self, epoch, logs=None):
        logs = logs or {}
        # Print the metrics for the current epoch
        print(f"Epoch {epoch + 1}: {logs}")

        # Save metrics in a list for later use
        self.epochs.append({"epoch": epoch + 1, **logs})

# Instantiate the custom callback
epoch_logger = EpochLogger()

# Train the model and use the custom callback
history = model.fit(
    x_train,
    y_train,
    epochs=20,
    batch_size=32,
    validation_data=(x_test, y_test),
    callbacks=[epoch_logger]
)

# Save the epoch logs to a CSV file
epoch_logs_df = pd.DataFrame(epoch_logger.epochs)
epoch_logs_df.to_csv('epoch_logs.csv', index=False)

# Print the saved dataframe
print(epoch_logs_df)

"""### Test model"""

# Predict on the test data
y_pred = model.predict(x_test)

# Inverse transform the predictions
y_pred_original = scaler.inverse_transform(y_pred.reshape(-1, 1))
y_test_original = scaler.inverse_transform(y_test.reshape(-1, 1))

"""## Other resources code

### Load model
"""

loaded_model = load_model(Save_model_dir)

"""### Save model"""

# save in tensoflow model
model.save(Save_model_dir)