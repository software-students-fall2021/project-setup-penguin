import "./Button.css";
import { Link } from "react-router-dom";

function Button({ btnText, onClick, linkTo, icon }) {
  const btn = (
    <button className="Button" onClick={onClick}>
      {btnText}
      {icon && <span className="Button__iconContainer">{icon}</span>}
    </button>
  );
  return linkTo ? <Link to={linkTo}>{btn}</Link> : btn;
}

export default Button;
