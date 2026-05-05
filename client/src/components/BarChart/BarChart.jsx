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

export default function BarChart({ records, tool }) {
  const groupBy = tool === "all" ? "tool" : "model";

  const totals = records.reduce((acc, record) => {
    const key = record[groupBy];
    acc[key] = (acc[key] || 0) + record.cost;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(totals),
    datasets: [
      {
        label: "Total Cost (USD)",
        data: Object.values(totals),
        backgroundColor: "#1976d2",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: tool === "all" ? "Cost by Tool" : `Cost by Model (${tool})`,
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
      <Bar data={data} options={options} />
    </div>
  );
}
