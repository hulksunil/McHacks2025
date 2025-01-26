import { useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 500,
      ticks: {
        stepSize: 10,
      },
    },
  },
};

const MyChart = ({ data }) => {
  const chartRef = useRef(null);

  return (
    <div className="graph">
      <Chart ref={chartRef} type="bar" data={data} options={options} />
    </div>
  );
};

export default MyChart;
