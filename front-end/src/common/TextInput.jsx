import "./TextInput.css";

function TextInput({ isLarge = false, placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={isLarge ? "TextInput__Large" : "TextInput"}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
