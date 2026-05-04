import "./MyInput.css";

export default function MyInput({ type = "date" }) {
  return (
    <div>
      <input type={type} />
    </div>
  );
}
