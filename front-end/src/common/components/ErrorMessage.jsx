import "./ErrorMessage.css";

export default function ErrorMessage({ error, className }) {
  return <p className={`ErrorMessage  ${className}`}>{error}</p>;
}
