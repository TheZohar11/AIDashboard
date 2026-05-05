import { useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton/MyButton";
import MyPicture from "./components/MyPicture/MyPicture";
import Header from "./components/Header/Header";
import logo from "./assets/eToro-logo.png";
import MyText from "./components/MyText/MyText";
import MyInput from "./components/MyInput/MyInput";
import DropDown from "./components/DropDown/DropDown";
import BarChart from "./components/BarChart/BarChart";
import MetricsPanel from "./components/MetricsPanel/MetricsPanel";
import AIPanel from "./components/AIPanel/AIPanel";
import { INTERVAL_OPTIONS, METRIC_OPTIONS, MODELS, TOOLS } from "./constants/constants";

export default function App() {
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0].value);
  const [tool, setTool] = useState(TOOLS[0].value);
  const [model, setModel] = useState(MODELS[0].value);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([]);
  const [submittedTool, setSubmittedTool] = useState(TOOLS[0].value);
  const [metric, setMetric] = useState(METRIC_OPTIONS[0].value);

  async function handleOnSubmit() {
    const params = new URLSearchParams();
    if (tool !== "all") params.append("tool", tool);
    if (model !== "all") params.append("model", model);
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("until", endDate);

    const response = await fetch(`http://localhost:3000/usage?${params}`);
    const data = await response.json();
    setRecords(data);
    setSubmittedTool(tool);
  }

  return (
    <div className="main">
      <div className="top-bar">
        <MyPicture picture={logo} alt="eToro Logo" />
        <Header text="eToro AI usage dashboard!" />
      </div>
      <div className="user-input-fields">
        <div>
          <MyText text="from date" />
          <MyInput
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <MyText text="until date" />
          <MyInput
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <MyText text="Tool" />
          <DropDown
            options={TOOLS}
            value={tool}
            onChange={(e) => setTool(e.target.value)}
          />
        </div>
        {/* <div>
          <MyText text="Model" />
          <DropDown
            options={MODELS}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div> */}
        <div>
          <MyText text="Display" />
          <DropDown
            options={METRIC_OPTIONS}
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          />
        </div>
        <div className="submit-wrapper">
          <MyText text=" " />
          <MyButton text="submit" onClick={() => handleOnSubmit()} />
        </div>
      </div>
      {records.length > 0 && <MetricsPanel records={records} />}
      {records.length > 0 && (
        <BarChart records={records} tool={submittedTool} metric={metric} />
      )}
      {records.length > 0 && <AIPanel records={records} />}
    </div>
  );
}
