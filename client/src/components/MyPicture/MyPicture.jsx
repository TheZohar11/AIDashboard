import React from "react";
import "./MyPicture.css";

export default function MyPicture({ picture, alt = "Picture" }) {
  return (
    <div>
      <img
        src={picture}
        alt={alt}
        className="logo-img"
      />
    </div>
  );
}
