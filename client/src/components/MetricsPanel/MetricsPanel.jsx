import "./MetricsPanel.css";

export default function MetricsPanel({ records }) {
  const totalCost = records.reduce((sum, r) => sum + r.cost, 0);
  const totalTokens = records.reduce(
    (sum, r) => sum + r.inputTokens + r.outputTokens,
    0,
  );
  const costPer1K = totalTokens > 0 ? (totalCost / totalTokens) * 1000 : 0;

  const toolCounts = records.reduce((acc, r) => {
    acc[r.tool] = (acc[r.tool] || 0) + 1;
    return acc;
  }, {});
  const mostUsedTool =
    Object.entries(toolCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";

  const metrics = [
    { label: "Total Cost", value: `$${totalCost.toFixed(3)}` },
    { label: "Most Used Tool", value: mostUsedTool },
    { label: "Total Tokens", value: totalTokens.toLocaleString() },
    { label: "Cost per 1K Tokens", value: `$${costPer1K.toFixed(4)}` },
  ];

  return (
    <div className="metrics-panel">
      {metrics.map((m) => (
        <div key={m.label} className="metric-card">
          <div className="metric-value">{m.value}</div>
          <div className="metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
