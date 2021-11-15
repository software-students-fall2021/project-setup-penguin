import "./TextInput.css";

function TextInput({
  isLarge = false,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={"TextInput " + (isLarge && "TextInput__Large")}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
