import MyText from "../MyText/MyText";
import MyButton from "../MyButton/MyButton";
import "./AIPanel.css";
import { useState } from "react";

export default function AIPanel({ records }) {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOnClick() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (e) {
      console.error(e);
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
      {recommendations && <p>{recommendations}</p>}
    </div>
  );
}
