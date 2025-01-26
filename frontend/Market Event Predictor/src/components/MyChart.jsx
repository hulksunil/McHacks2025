import { useRef } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

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
      display: true
    }
  },
  scales: {
    y: {
      min: 30,
      max: 90,
      ticks: {
        stepSize: 10
      }
    }
  }
};

const MyChart = ({ data }) => {
  const chartRef = useRef(null);

  return (
    <div className='graph' >
      <h1>Stock Price</h1>
      <Chart ref={chartRef} type='bar' data={data} options={options} />
    </div>
  )
}

export default MyChart;