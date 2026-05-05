import "./MyButton.css";

export default function MyButton({ text, onClick }) {
  return (
    <div className="container">
      <button className="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
