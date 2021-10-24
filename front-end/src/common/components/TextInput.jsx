import "./TextInput.css";

function TextInput({ isLarge = false, placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={"TextInput " + (isLarge && "TextInput__Large")}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
