import "./TextInput.css";

function TextInput({
  isLarge = false,
  placeholder,
  value,
  onChange,
  type = "text",
  onKeyPress,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={"TextInput " + (isLarge && "TextInput__Large")}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

export default TextInput;
