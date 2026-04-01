import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import ChartCard from "./components/ChartCard";

function App() {
  const [chartData, setChartData] = useState(null);

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "10px",
      color: "#e2e8f0",
      fontFamily: "Arial, sans-serif"
    }}>
      <header style={{
        textAlign: "center",
        padding: "20px",
        background: "#1e293b",
        borderBottom: "3px solid #38bdf8",
        marginBottom: "30px"
      }}>
        <h1>Data Dashboard</h1>
      </header>

      <FileUploader onDataLoaded={setChartData} />

      {chartData && chartData.labels && chartData.values && (
        <ChartCard
          labels={chartData.labels}
          values={chartData.values}
          type="bar"
          title="Uploaded CSV Data"
        />
      )}
    </div>
  );
}

export default App;