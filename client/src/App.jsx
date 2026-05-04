import { useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton/MyButton";
import MyPicture from "./components/MyPicture/MyPicture";
import logo from "./assets/eToro-logo.png";

export default function App() {
  return (
    <div className="user-input-fields">
      <MyPicture picture={logo} alt="eToro Logo" />
      <h2> welcome to eToro dashboard!</h2>
      <MyButton text="submit" />
    </div>
  );
}
