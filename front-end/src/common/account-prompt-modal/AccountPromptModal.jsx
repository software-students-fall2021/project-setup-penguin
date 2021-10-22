import { Link } from "react-router-dom";

import "./AccountPromptModal.css";

function AccountPromptModal({ parentType, onCloseModal }) {
  return (
    <div className="AccountPromptModal">
      <div className="AccountPromptModal__content">
        <div className="AccountPromptModal__header">
          <h1 className="AccountPromptModal__title">
            Want to save your {parentType} to an account?
          </h1>
        </div>
        <div className="AccountPromptModal__body">
          <p>
            If you want to be able to update and manage your {parentType} later,
            sign up for an account. Otherwise, just go ahead and create your{" "}
            {parentType}!
          </p>
          {/* TODO: replace navigation with actual components for sign up or login. This prevents the page or url from changing */}
          <Link to="signup">Sign Up</Link>
          <p>
            Already have an account? Log in <Link to="login">here</Link>
          </p>
          <div className="AccountPromptModal__footer">
            <Link to="/finishdeck" onClick={() => onCloseModal()}>
              Continue as Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPromptModal;
