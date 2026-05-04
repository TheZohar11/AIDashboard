import { useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton/MyButton";
import MyPicture from "./components/MyPicture/MyPicture";
import Header from "./components/Header/Header";
import logo from "./assets/eToro-logo.png";
import MyText from "./components/MyText/MyText";
import MyInput from "./components/MyInput/MyInput";

import { INTERVAL_OPTIONS, TOOLS } from "./constants/constants";

export default function App() {
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0].value);

  return (
    <div className="main">
      <div className="user-input-fields">
        <MyPicture picture={logo} alt="eToro Logo" />
        <Header text="eToro AI usage dashboard!" />
        <div>
          <MyText text="from date" />
          <MyInput />
        </div>
        <div>
          <MyText text="until date" />
          <MyInput />
        </div>

        <DropDown options={TOOLS} value={TOOLS[0].value} onChange={() => {}} />

        <MyButton text="submit" />
      </div>
    </div>
  );
}
