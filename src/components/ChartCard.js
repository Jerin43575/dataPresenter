import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = ({ labels, values, labelName, valueName, initialType = "bar" }) => {
  const [chartType, setChartType] = useState(initialType);

  const data = {
    labels,
    datasets: [
      {
        label: valueName, // dynamic from CSV
        data: values,
        backgroundColor:
          chartType === "pie"
            ? [
                "rgba(56, 189, 248, 0.6)",
                "rgba(52, 211, 153, 0.6)",
                "rgba(251, 191, 36, 0.6)",
                "rgba(239, 68, 68, 0.6)"
              ]
            : "rgba(56, 189, 248, 0.6)",
        borderColor:
          chartType === "pie"
            ? [
                "rgba(56, 189, 248, 1)",
                "rgba(52, 211, 153, 1)",
                "rgba(251, 191, 36, 1)",
                "rgba(239, 68, 68, 1)"
              ]
            : "rgba(56, 189, 248, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top", labels: { color: "#e2e8f0" } },
      title: { display: true, text: valueName, color: "#e2e8f0", font: { size: 18 } }
    },
    scales:
      chartType === "pie"
        ? {}
        : {
            y: { beginAtZero: true, ticks: { color: "#e2e8f0" }, title: { display: true, text: valueName, color: "#e2e8f0" } },
            x: { ticks: { color: "#e2e8f0" }, title: { display: true, text: labelName, color: "#e2e8f0" } }
          }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        width: "90%",
        maxWidth: "600px",
        margin: "20px auto"
      }}
    >
      {/* Dropdown to select chart type */}
      <div style={{ marginBottom: "15px", textAlign: "right" }}>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#0f172a",
            color: "#e2e8f0",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      {/* Chart container */}
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        {chartType === "bar" && <Bar data={data} options={options} />}
        {chartType === "line" && <Line data={data} options={options} />}
        {chartType === "pie" && <Pie data={data} options={options} />}
      </div>
    </div>
  );
};

export default ChartCard;