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
  const [askPrices, setAskPrices] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockAskPrice = (stock, newAskPrice) => {
    setAskPrices((prevPrices) => ({
      ...prevPrices,
      [stock]: newAskPrice // Limit to the last 100 entries
    }));
  };


  const [bidPrices, setBidPrices] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockBidPrice = (stock, newBidPrice) => {
    setBidPrices((prevPrices) => ({
      ...prevPrices,
      [stock]: newBidPrice, // Limit to the last 100 entries
    }));
  };

  const [askVolumes, setAskVolumes] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockAskVolume = (stock, newAskVolume) => {
    setAskVolumes((prevVolumes) => ({
      ...prevVolumes,
      [stock]: newAskVolume, // Limit to the last 100 entries
    }));
  };

  const [bidVolumes, setBidVolumes] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockBidVolume = (stock, newBidVolume) => {
    setBidVolumes((prevVolumes) => ({
      ...prevVolumes,
      [stock]: newBidVolume, // Limit to the last 100 entries
    }));
  }

  const [midPrices, setMidPrices] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockMidPrice = (stock, newMidPrice) => {
    setMidPrices((prevPrices) => ({
      ...prevPrices,
      [stock]: newMidPrice, // Limit to the last 100 entries
    }));
  }

  const [spreads, setSpreads] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockSpread = (stock, newSpread) => {
    setSpreads((prevSpreads) => ({
      ...prevSpreads,
      [stock]: newSpread, // Limit to the last 100 entries
    }));
  }

  const [std30s, setStd30s] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockStd30s = (stock, newStd30s) => {
    setStd30s((prevStd30s) => ({
      ...prevStd30s,
      [stock]: newStd30s, // Limit to the last 100 entries
    }));
  }

  const [std60s, setStd60s] = useState({
    stockA: [],
    stockB: [],
    stockC: [],
    stockD: [],
    stockE: [],
  });

  const updateStockStd60s = (stock, newStd60s) => {
    setStd60s((prevStd60s) => ({
      ...prevStd60s,
      [stock]: newStd60s, // Limit to the last 100 entries
    }));
  }

  const [load, updateLoad] = useState(true);

  const [timestamps, setTimestamps] = useState([]);


  const midPriceData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: midPrices.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: midPrices.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: midPrices.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: midPrices.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock E",
        data: midPrices.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const bidPricesData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: bidPrices.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: bidPrices.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: bidPrices.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: bidPrices.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock E",
        data: bidPrices.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const askVolumesData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: askVolumes.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: askVolumes.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: askVolumes.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: askVolumes.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock E",
        data: askVolumes.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };





  const bidVolumesData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: bidVolumes.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: bidVolumes.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: bidVolumes.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: bidVolumes.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock E",
        data: bidVolumes.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };


  const spreadsData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: spreads.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: spreads.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: spreads.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: spreads.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock E",
        data: spreads.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };


  const std30sData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: std30s.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: std30s.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: std30s.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: std30s.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock E",
        data: std30s.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };


  const std60sData = {
    labels: timestamps,
    datasets: [
      {
        type: "line",
        label: "Stock A",
        data: std60s.stockA,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock B",
        data: std60s.stockB,
        backgroundColor: "rgb(192, 75, 75)",
        borderColor: "rgb(192, 75, 75)",
        pointBorderColor: "rgb(192, 75, 75)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock C",
        data: std60s.stockC,
        backgroundColor: "rgb(192, 165, 75)",
        borderColor: "rgb(192, 165, 75)",
        pointBorderColor: "rgb(192, 165, 75)",
        fill: true,
        tension: 0.4,
      },
      {
        type: "line",
        label: "Stock D",
        data: std60s.stockD,
        backgroundColor: "rgb(75, 192, 110)",
        borderColor: "rgb(75, 192, 110)",
        pointBorderColor: "rgb(75, 192, 110)",
        fill: true,
        tension: 0.4,
      },

      {
        type: "line",
        label: "Stock E",
        data: std60s.stockE,
        backgroundColor: "rgb(75, 89, 192)",
        borderColor: "rgb(75, 89, 192)",
        pointBorderColor: "rgb(75, 100, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };



  const postData = async () => {
    try {
      const response = await axios.post("/api/stock_data/market_data");
      const stocks = response.data[0];

      // for each stock
      for (let i = 0; i < stocks.length; i++) {

        if (i === 0) {
          // Update timestamps
          const newTimestamps = stocks[i].map((entry) => entry.timestamp).slice(-100);
          console.log(newTimestamps);
          setTimestamps(newTimestamps);
        }

        const stockIAskPrices = stocks[i].map((entry) => entry.askPrice).slice(-100);
        updateStockAskPrice(getStockFromIndex(i), stockIAskPrices);

        const stockIBidPrices = stocks[i].map((entry) => entry.bidPrice).slice(-100);
        updateStockBidPrice(getStockFromIndex(i), stockIBidPrices);

        const stockIAskVolumes = stocks[i].map((entry) => entry.askVolume).slice(-100);
        updateStockAskVolume(getStockFromIndex(i), stockIAskVolumes);

        const stockIBidVolumes = stocks[i].map((entry) => entry.bidVolume).slice(-100);
        updateStockBidVolume(getStockFromIndex(i), stockIBidVolumes);

        const stockIMidPrices = stocks[i].map((entry) => entry.midPrice).slice(-100);
        updateStockMidPrice(getStockFromIndex(i), stockIMidPrices);

        const stockISpreads = stocks[i].map((entry) => entry.spread).slice(-100);
        updateStockSpread(getStockFromIndex(i), stockISpreads);

        const stockIStd30s = stocks[i].map((entry) => entry.std_30s).slice(-100);
        updateStockStd30s(getStockFromIndex(i), stockIStd30s);

        const stockIStd60s = stocks[i].map((entry) => entry.std_60s).slice(-100);
        updateStockStd60s(getStockFromIndex(i), stockIStd60s);

      }

      // depending on the graph title, the data will be different


      // const marketData = responseData["A"]["market_data"];

      // console.log(fiveDatasets);

      // const groupedData = marketData.reduce((acc, obj) => {
      //   for (const key in obj) {
      //     if (!acc[key]) {
      //       acc[key] = []; // Initialize an array for each key
      //     }
      //     acc[key].push(obj[key]); // Push the value into the respective array
      //   }
      //   return acc;
      // }, {});

      // console.log(groupedData);

      // setGroupedData({
      //   timestamps: groupedData["timestamp"],
      //   stockPrices: groupedData["stockPrice"],
      //   bidVolumes: groupedData["bidVolume"],
      //   bidPrices: groupedData["bidPrice"],
      //   askVolumes: groupedData["askVolume"],
      //   askPrices: groupedData["askPrice"]
      // });

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
          background: "", // Dark to slightly light blue-purple gradient
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
              <MyChart title={"AskPrice vs BidPrice"} data={bidPricesData} yMin={100} yMax={120} />
            </Box>
            <Box className="graph" sx={{ my: 4 }}>
              <MyChart title={"AskVolume vs BidVolume"} data={askVolumesData} yMin={0} yMax={180} />
            </Box>
            <Box className="graph" sx={{ my: 4 }}>
              <MyChart title={"Mid Price Comparison"} data={midPriceData} yMin={100} yMax={120} />
            </Box>
            <Box className="graph" sx={{ my: 4 }}>
              <MyChart title={"Spread"} data={spreadsData} yMin={0} yMax={0.45} />
            </Box>
            <Box className="graph" sx={{ my: 4 }}>
              <MyChart title={"std_30s"} data={std30sData} yMin={0} yMax={0.8} />
            </Box>
            <Box className="graph" sx={{ my: 4 }}>
              <MyChart title={"std_60s"} data={std60sData} yMin={0} yMax={1} />
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


const getStockFromIndex = (index) => {
  switch (index) {
    case 0:
      return "stockA";
    case 1:
      return "stockB";
    case 2:
      return "stockC";
    case 3:
      return "stockD";
    case 4:
      return "stockE";
    default:
      console.log("Invalid index");
      return "stockA";
  }
};

export default App;
