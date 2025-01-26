import MyChart from "./components/MyChart";
import { Container, Box, Typography, TextField } from "@mui/material";
import GradientToggleButton from "./components/GradientToggleButton";
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

      console.log(responseData);
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



  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPosition((prevPosition) => ({
      ...prevPosition,
      [name]: value,
    }));
  };

  return (
    <>
      <Loader load={load} />

      <Box
        sx={{
          background: "linear-gradient(180deg, #1a237e 0%, #8e24aa 100%)", // Dark to slightly light blue-purple gradient
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              MarketSnitch
            </Typography>
            <Box className="graph" sx={{ my: 4 }}>
              <MyChart data={data} />
            </Box>
            <GradientToggleButton
              position={position}
              onPositionChange={handlePositionChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default App;
