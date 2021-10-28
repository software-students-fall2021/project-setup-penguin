import SignupOrLogin from "./SignupOrLogin";
import { useState } from "react";
import { MODAL_PAGE_TYPE } from "../../common/constants";
import { CustomModal } from "../../common";

function AccountPromptModal({
  showModal,
  onCloseModal,
  parentType,
  onContinueAsGuest,
  onSignupOrLogin,
}) {
  const [pageType, setPageType] = useState(MODAL_PAGE_TYPE.SIGNUP);

  return (
    <CustomModal
      showModal={showModal}
      onCloseModal={onCloseModal}
      header={`Want to link your ${parentType} to an account?`}
    >
      <h1>Want to link your {parentType} to an account?</h1>
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
    </CustomModal>
  );
}

export default AccountPromptModal;
