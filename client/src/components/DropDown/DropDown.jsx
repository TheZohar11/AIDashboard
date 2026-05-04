import "./DropDown.css";

export default function DropDown({ onChange, options, value }) {
  return (
    <div className="container">
      <select onChange={onChange} value={value}>
        {options.map((option) => (
          <option
            key={option.value || option.label}
            value={option.value || option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
