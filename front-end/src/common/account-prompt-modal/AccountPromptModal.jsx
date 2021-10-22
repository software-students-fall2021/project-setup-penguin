import SignupOrLogin from "./SignupOrLogin";
import "./AccountPromptModal.css";
import { useState } from "react";
function AccountPromptModal({ parentType, onCloseModal }) {
  const [pageType, setPageType] = useState("Sign up");

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
          <SignupOrLogin
            onCloseModal={onCloseModal}
            pageType={pageType}
            setPageType={setPageType}
          />
        </div>
        <div className="AccountPromptModal__footer">
          <a
            className="AccountPromptModal__link nakedLink"
            onClick={() => {
              console.log("continue as guest");
              onCloseModal();
            }}
          >
            Continue as guest
          </a>
          <span
            className="AccountPromptModal__cta"
            onClick={() => {
              console.log("submit");
              onCloseModal();
            }}
          >
            {pageType}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountPromptModal;
