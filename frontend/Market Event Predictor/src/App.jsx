import MyChart from "./components/MyChart";
import { Container, Box, Typography, TextField } from "@mui/material";
import GradientToggleButton from "./components/GradientToggleButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const generateTimestamps = (count) => {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => now - (count - i) * 1000);
};

const timestamps = generateTimestamps(7); // Generate 7 timestamps, one per second

const data = {
  labels: timestamps,
  datasets: [
    {
      type: "line",
      label: "Stock Price",
      data: timestamps.map((timestamp, index) => ({
        x: timestamp,
        y: [0, 50, 100, 150, 200, 250, 300][index],
      })),
      backgroundColor: "rgba(25, 25, 192, 0.2)",
      borderColor: "rgba(25, 25, 192, 1)",
      pointBorderColor: "rgba(25, 25, 192, 1)",
      fill: true,
      tension: 0.4,
    },
    {
      type: "line",
      label: "Bid Volume",
      data: timestamps.map((timestamp, index) => ({
        x: timestamp,
        y: [1, 11, 80, 50, 30, 25, 55][index],
      })),
      backgroundColor: "rgba(18, 230, 89, 0.2)",
      borderColor: "rgba(18, 230, 89, 1)",
      pointBorderColor: "rgba(18, 230, 89, 1)",
      fill: true,
      tension: 0.4,
    },
    {
      type: "line",
      label: "Bid Price",
      data: timestamps.map((timestamp, index) => ({
        x: timestamp,
        y: [65, 59, 80, 81, 56, 55, 40][index],
      })),
      backgroundColor: "rgba(25, 25, 192, 0.2)",
      borderColor: "rgba(25, 25, 192, 1)",
      pointBorderColor: "rgba(25, 25, 192, 1)",
      fill: true,
      tension: 0.4,
    },
    {
      type: "line",
      label: "Ask Volume",
      data: timestamps.map((timestamp, index) => ({
        x: timestamp,
        y: [25, 100, 30, 93, 45, 100, 20][index],
      })),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBorderColor: "rgba(255, 99, 132, 1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const App = () => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPosition((prevPosition) => ({
      ...prevPosition,
      [name]: value,
    }));
  };

  return (
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
  );
};

export default App;
