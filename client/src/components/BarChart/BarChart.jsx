import { Bar } from "react-chartjs-2";
import "./BarChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BarChart({ records, tool, metric }) {
  const groupBy = tool === "all" ? "tool" : "model";

  const totals = records.reduce((acc, record) => {
    const key = record[groupBy];
    const value = metric === "cost" ? record.cost : (record.inputTokens + record.outputTokens);
    acc[key] = (acc[key] || 0) + value;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(totals),
    datasets: [
      {
        label: metric === "cost" ? "Total Cost (USD)" : "Total Tokens",
        data: Object.values(totals),
        backgroundColor: "#1976d2",
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: tool === "all" ? `${metric === "cost" ? "Cost" : "Tokens"} by Tool` : `${metric === "cost" ? "Cost" : "Tokens"} by Model (${tool})`,

        color: "#90caf9",
        font: { size: 16 },
      },
    },
    scales: {
      x: { ticks: { color: "#90caf9" }, grid: { color: "#2e3450" } },
      y: { ticks: { color: "#90caf9" }, grid: { color: "#2e3450" } },
    },
  };

  return (
    <div className="chart-container">
      <Bar
        data={data}
        options={{ ...options, maintainAspectRatio: false }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
