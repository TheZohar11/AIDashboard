import { useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton/MyButton";
import MyPicture from "./components/MyPicture/MyPicture";
import Header from "./components/Header/Header";
import logo from "./assets/eToro-logo.png";
import MyText from "./components/MyText/MyText";
import MyInput from "./components/MyInput/MyInput";
import DropDown from "./components/DropDown/DropDown";

import { INTERVAL_OPTIONS, MODELS, TOOLS } from "./constants/constants";

export default function App() {
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0].value);
  const [tool, setTool] = useState(TOOLS[0].value);
  const [model, setModel] = useState(MODELS[0].value);

  return (
    <div className="main">
      <div className="top-bar">
        <MyPicture picture={logo} alt="eToro Logo" />
        <Header text="eToro AI usage dashboard!" />
      </div>
      <div className="user-input-fields">
        <div>
          <MyText text="from date" />
          <MyInput />
        </div>
        <div>
          <MyText text="until date" />
          <MyInput />
        </div>

        <div>
          <MyText text="Tool" />
          <DropDown
            options={TOOLS}
            value={tool}
            onChange={(e) => setTool(e.target.value)}
          />
        </div>
        <div>
          <MyText text="Model" />
          <DropDown
            options={MODELS}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="submit-wrapper">
          <MyText text=" " />
          <MyButton text="submit" />
        </div>
      </div>
    </div>
  );
}
