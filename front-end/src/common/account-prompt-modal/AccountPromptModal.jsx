import SignupOrLogin from "./SignupOrLogin";
import "./AccountPromptModal.css";
import { useState } from "react";
import { MODAL_PAGE_TYPE } from "../../common/constants";

function AccountPromptModal({
  parentType,
  onContinueAsGuest,
  onSignupOrLogin,
}) {
  // TODO: close Modal on click outside / click on x
  const [pageType, setPageType] = useState(MODAL_PAGE_TYPE.SIGNUP);

  return (
    <div className="AccountPromptModal">
      <div className="AccountPromptModal__content">
        <div className="AccountPromptModal__header">
          <h1 className="AccountPromptModal__title">
            Want to link your {parentType} to an account?
          </h1>
        </div>
        <div className="AccountPromptModal__body">
          <p>
            If you want to be able to update and manage your {parentType} later,
            sign up for an account. Otherwise, go ahead and continue as a guest.
          </p>
          <SignupOrLogin
            onContinueAsGuest={onContinueAsGuest}
            onSignupOrLogin={onSignupOrLogin}
            pageType={pageType}
            setPageType={setPageType}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountPromptModal;
