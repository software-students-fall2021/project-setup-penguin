import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SignupOrLogin from "../../common/account-prompt-modal/SignupOrLogin";
import { MODAL_PAGE_TYPE } from "../../common/constants";

import "./loginSignup.css";

function LoginSignup({ pageType, setToken }) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleRedirect = (page) => {
    if (page === MODAL_PAGE_TYPE.LOGIN) {
      history.push("/login");
    } else if (page === MODAL_PAGE_TYPE.SIGNUP) {
      history.push("/signup");
    }
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      // TODO: create & save account – get id of newly created account
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user`,
        data: {
          email,
          password,
          name,
        },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          history.push("/accountpage");
        })
        .catch((err) => {
          setErrors(err.response.data.messages);
        });
    } else {
      // log user in – get id of existing account
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          history.push("/account");
        })
        .catch((err) => {
          setErrors(err.response.data.messages);
        });
    }
  };

  return (
    <div className="LoginSignup">
      <SignupOrLogin
        pageType={pageType}
        setPageType={handleRedirect}
        onSignupOrLogin={onSignupOrLogin}
        onContinueAsGuest={null}
        useAsPage={true}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
}

export default LoginSignup;
