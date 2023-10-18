import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./DoughnutChart.css";

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Java", "React", "DevOps", ".NET"],
        datasets: [
          {
            data: [100, 150, 100, 60],
            backgroundColor: [
              "rgb(255, 0, 0)",
              "rgb(0, 102, 255)",
              "rgb(0, 255, 0)",
              "rgb(255, 0, 222)",
            ],
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
    <div className="donut-container">
      <div>
        <canvas className="doughnut-chart" ref={chartRef} />
      </div>
    </div>
  );
};

export default DoughnutChart;
