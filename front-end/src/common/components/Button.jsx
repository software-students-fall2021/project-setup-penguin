import "./Button.css";
import { Link } from "react-router-dom";

/**
 * you should pass in either onClick or linkTo
 * @param linkTo object/string passed into <Link> component – use to change routes
 * @param onClick function called on button click – use to trigger same-page behavior (modal)
 * @returns
 */
function Button({ btnText, onClick, linkTo, icon, disabled }) {
  const btn = (
    <button
      className={`Button ${disabled && "Button--disabled"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
      {icon && <span className="Button__iconContainer">{icon}</span>}
    </button>
  );
  return linkTo ? <Link to={linkTo}>{btn}</Link> : btn;
}

export default Button;
