import "./Button.css";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Button({ btnText, onClick, linkTo }) {
  const btn = (
    <button className="Button" onClick={onClick}>
      {btnText}
      <span className="Button__iconContainer">
        <Icon.ArrowRight />
      </span>
    </button>
  );
  return linkTo ? <Link to={linkTo}>{btn}</Link> : btn;
}

export default Button;
