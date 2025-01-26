import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const MyChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
          speed: 25, // Increase speed for smoother panning
          limits: {
            x: { min: 0 },
            y: { min: 0 },
          },
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1, // Increase speed for smoother zooming
          },
          pinch: {
            enabled: true,
            speed: 0.1, // Increase speed for smoother zooming
          },
          mode: "xy",
          limits: {
            x: { min: 0, max: 15000 }, // 0 to 15 seconds in milliseconds
            y: { min: 0, max: 200 }, // Set y-axis limits
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "HH:mm:ss",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "Time (seconds)",
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return (value / 1000).toFixed(2); // Convert milliseconds to seconds and format to 0.00
          },
        },
      },
      y: {
        min: 0, // Set minimum value for y-axis
        max: 200, // Set maximum value for y-axis
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MyChart;
