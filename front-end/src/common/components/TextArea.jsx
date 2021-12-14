import "./TextArea.css";

function TextArea({ placeholder, value, onChange }) {
  return (
    <textarea
      rows={2}
      placeholder={placeholder}
      className="TextArea"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextArea;
