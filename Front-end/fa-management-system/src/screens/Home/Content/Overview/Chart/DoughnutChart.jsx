import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./DoughnutChart.css";
import apiClassInstance from "../../../../../service/api-class";

const DoughnutChart = () => {
  const [java, setJava] = useState([]);
  const [react, setReact] = useState([]);
  const [net, setNet] = useState([]);
  const [devops, setDevops] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    apiClassInstance.get(`/searchClassByKeyword?key=java`).then((response) => {
      setJava(response.data.payload);
    });
    apiClassInstance.get(`/searchClassByKeyword?key=react`).then((response) => {
      setReact(response.data.payload);
    });
    apiClassInstance.get(`/searchClassByKeyword?key=net`).then((response) => {
      setNet(response.data.payload);
    });
    apiClassInstance
      .get(`/searchClassByKeyword?key=devops`)
      .then((response) => {
        setDevops(response.data.payload);
      });
  }, []);

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
            data: [java.length, react.length, devops.length, net.length],
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
  }, [java, react, net, devops]);
  return (
    <div className="donut-container">
      <div>
        <canvas className="doughnut-chart" ref={chartRef} />
      </div>
    </div>
  );
};

export default DoughnutChart;
