import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "./LineChart.css";
const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Java",
            data: [39, 59, 67, 43, 55, 80, 82],
            fill: false,
            borderColor: "rgb(255, 0, 0)",
            tension: 0.1,
          },
          {
            label: "React",
            data: [50, 61, 65, 78, 68, 85, 90],
            fill: false,
            borderColor: "rgb(0, 102, 255)",
            tension: 0.1,
          },
          {
            label: "DevOps",
            data: [12, 23, 43, 61, 64, 54, 59],
            fill: false,
            borderColor: "rgb(0, 255, 0)",
            tension: 0.1,
          },
          {
            label: ".NET",
            data: [30, 49, 54, 30, 76, 56, 71],
            fill: false,
            borderColor: "rgb(255, 0, 222)",
            tension: 0.1,
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return (
    <div className="line-container">
      <div>
        <canvas className="line-chart" ref={chartRef} />
      </div>
    </div>
  );
};
export default LineChart;
