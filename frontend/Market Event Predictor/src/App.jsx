import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Chart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Store chart instance

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
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

    const options = {
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

    useEffect(() => {
        // Destroy chart if it already exists before creating a new one
        if (chartInstance.current) {
                        chartInstance.current.destroy();
                    }
            
                    const ctx = chartRef.current.getContext('2d');
                    chartInstance.current = new ChartJS(ctx, {
                        type: 'line',
                        data: data,
                        options: options
                    });
                }, [data, options]);
            
                return <canvas ref={chartRef}></canvas>;
            }
            
            export default Chart;
