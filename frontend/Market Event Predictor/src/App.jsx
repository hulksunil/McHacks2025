import MyChart from './components/MyChart';
import './App.css';


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Stock Price',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgb(25, 25, 192)',
      borderColor: 'rgb(75, 192, 192)',
      pointBorderColor: 'rgb(75, 100, 192)',
      fill: true,
      tension: 0.4
    }
  ]
};


const App = () => {

  return (
    <div className="App">
      <MyChart data={data} />
    </div>
  )
};

export default App;
