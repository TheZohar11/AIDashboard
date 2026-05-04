import "./Header.css";

export default function Header({ text }) {
  return (
    <div className="header">
      <h2 className="header-text">{text}</h2>
    </div>
  );
}
