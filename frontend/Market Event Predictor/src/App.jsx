import MyChart from "./components/MyChart";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Loader = ({ load }) => {
  return (

    <div className="loader">
      <div className={load ? "loader_icon" : "loader_icon loader_icon_none"}></div>
    </div>
  );
}

const App = () => {

  const [groupedData, setGroupedData] = useState({
    timestamps: [],
    stockPrices: [],
    bidVolumes: [],
    bidPrices: [],
    askVolumes: [],
    askPrices: [],
  });

  const [load, updateLoad] = useState(true);


  const data = {
    labels: groupedData.timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock Price",
        data: groupedData.stockPrices,
        backgroundColor: "rgb(25, 25, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Bid Volume",
        data: groupedData.bidVolumes,
        backgroundColor: "rgb(18, 230, 89)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(5, 100, 10)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Bid Price",
        data: groupedData.bidPrices,
        backgroundColor: "rgb(25, 25, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Ask Volume",
        data: groupedData.askVolumes,
        backgroundColor: "rgb(25, 25, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Ask Price",
        data: groupedData.askPrices,
        backgroundColor: "rgb(25, 25, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };



  const postData = async () => {
    try {
      const response = await axios.post("/api/stock_data");
      const responseData = response.data[0];
      const marketData = responseData["A"]["market_data"];

      const groupedData = marketData.reduce((acc, obj) => {
        for (const key in obj) {
          if (!acc[key]) {
            acc[key] = []; // Initialize an array for each key
          }
          acc[key].push(obj[key]); // Push the value into the respective array
        }
        return acc;
      }, {});

      console.log(groupedData);

      setGroupedData({
        timestamps: groupedData["timestamp"],
        stockPrices: groupedData["stockPrice"],
        bidVolumes: groupedData["bidVolume"],
        bidPrices: groupedData["bidPrice"],
        askVolumes: groupedData["askVolume"],
        askPrices: groupedData["askPrice"]
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postData().then(() => updateLoad(false));
  }, []);

  return (
    <>
      <Loader load={load} />
      <div className="App">
        <h1>AVNT</h1>
        <MyChart data={data} />
      </div>
    </>
  );
};

export default App;
