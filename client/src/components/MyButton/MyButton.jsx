import "./MyButton.css";

export default function MyButton({ text }) {
  return (
    <div className="container">
      <button className="button">{text}</button>
    </div>
  );
}
