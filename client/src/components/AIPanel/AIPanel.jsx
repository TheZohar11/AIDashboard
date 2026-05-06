import MyText from "../MyText/MyText";
import MyButton from "../MyButton/MyButton";
import "./AIPanel.css";
import { useState } from "react";

export default function AIPanel({ records }) {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleOnClick() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:3000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setRecommendations(data.recommendations);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <MyText text="AI Recommendations" />
        <MyButton text={loading ? "Loading..." : "Get Recommendations"} onClick={handleOnClick} />
      </div>
      {error && <p style={{ color: "#f48fb1" }}>{error}</p>}
      {recommendations && <p>{recommendations}</p>}
    </div>
  );
}
