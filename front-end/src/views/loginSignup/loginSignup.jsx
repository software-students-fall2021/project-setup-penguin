import { useHistory } from "react-router-dom";
import { useState } from "react";
import SignupOrLogin from "../../common/account-prompt-modal/SignupOrLogin";

import { MODAL_PAGE_TYPE } from "../../common/constants";

import "./loginSignup.css";

function LoginSignup({ pageType }) {
    const history = useHistory();
    const handleRedirect = (page) => {
        if (page === MODAL_PAGE_TYPE.LOGIN) {
            history.push("/login")
        } else if (page === MODAL_PAGE_TYPE.SIGNUP) {
            history.push("/signup")
        }
    }

    const onSignupOrLogin = (pageType, name, email, password) => {
        let userId;

        if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
            // TODO: create & save account – get id of newly created account
        } else {
            // log user in – get id of existing account
        }
    };

    return (
        <div className="LoginSignup">
            <SignupOrLogin
                pageType={pageType}
                setPageType={handleRedirect}
                onSignupOrLogin={onSignupOrLogin}
                onContinueAsGuest={null}
            />
        </div>
    );
}

export default LoginSignup;
