import "./TextInput.css";

function TextInput({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="TextInput"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
