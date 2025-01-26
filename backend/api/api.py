from flask import Flask, jsonify
from ..data.preprocessing import get_stock_data

app = Flask(__name__)  # Initializes the Flask app

@app.route('/api/stock_data', methods=['POST'])
def stock_data():
    data = get_stock_data()
    return jsonify(data)

@app.route('/api/stock_data/market_data', methods=['POST'])
def market_data():
    data = get_stock_data()
    return jsonify(data['market_data'])


@app.route('/api/stock_data/trade_data', methods=['POST'])
def trade_data():
    data = get_stock_data()
    return jsonify(data['trade_data'])

if __name__ == '__main__':
    app.run(debug=True)