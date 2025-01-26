import MyChart from "./components/MyChart";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const FirstRequest = () => {};

export { FirstRequest };

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      type: "line",
      label: "Stock Price",
      data: [0, 50, 100, 150, 200, 250, 300],
      backgroundColor: "rgb(25, 25, 192)",
      borderColor: "rgb(75, 192, 192)",
      pointBorderColor: "rgb(75, 100, 192)",
      fill: true,
      tension: 0.4,
    },

    {
      type: "line",
      label: "Bid Volume",
      data: [1, 11, 80, 50, 30, 25, 55],
      backgroundColor: "rgb(18, 230, 89)",
      borderColor: "rgb(75, 192, 192)",
      pointBorderColor: "rgb(5, 100, 10)",
      fill: true,
      tension: 0.4,
    },

    {
      type: "line",
      label: "Bid Price",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgb(25, 25, 192)",
      borderColor: "rgb(75, 192, 192)",
      pointBorderColor: "rgb(75, 100, 192)",
      fill: true,
      tension: 0.4,
    },

    {
      type: "line",
      label: "Ask Volume",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgb(25, 25, 192)",
      borderColor: "rgb(75, 192, 192)",
      pointBorderColor: "rgb(75, 100, 192)",
      fill: true,
      tension: 0.4,
    },

    {
      type: "line",
      label: "Ask Price",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgb(25, 25, 192)",
      borderColor: "rgb(75, 192, 192)",
      pointBorderColor: "rgb(75, 100, 192)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const App = () => {
  const [postState, setPostState] = useState(null);

  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:5173");
      const data = response.data;
      setPostState(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postData();
  }, []);

  return (
    <div className="App">
      <h1>AVNT</h1>
      <MyChart data={data} />
      {postState && (
        <div>Data from POST request: {JSON.stringify(postState)}</div>
      )}
    </div>
  );
};

export default App;
