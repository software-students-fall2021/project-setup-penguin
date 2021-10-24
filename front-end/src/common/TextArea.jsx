import "./TextArea.css";

function TextArea({ isLarge = false, placeholder, value, onChange }) {
  return (
    <textarea
      placeholder={placeholder}
      className={isLarge ? "TextArea__Large" : "TextArea"}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextArea;
