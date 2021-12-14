import "./ErrorMessage.css";

// errors should be an array
export default function ErrorMessage({ errors = [], className }) {
  return <p className={`ErrorMessage  ${className}`}>{errors.join(", ")}</p>;
}
