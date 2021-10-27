import { useState } from "react";
import { MODAL_PAGE_TYPE } from "../constants";
import { TextInput } from "../../common";

import "./SignupOrLogin.css";

const SignupOrLogin = ({
  pageType,
  setPageType,
  onContinueAsGuest,
  onSignupOrLogin,
  useAsPage = false,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="SignupOrLogin">
      {useAsPage ? <h1>{pageType}</h1> : <h3>{pageType}</h3>}
      {pageType === MODAL_PAGE_TYPE.SIGNUP && (
        <TextInput
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {pageType === MODAL_PAGE_TYPE.SIGNUP ? (
        <i className="SignupOrLogin__altLink">
          Already have an account? Log in{" "}
          <a
            className="SignupOrLogin__link"
            onClick={() => {
              setPageType(MODAL_PAGE_TYPE.LOGIN);
            }}
          >
            here
          </a>
        </i>
      ) : (
        <i className="SignupOrLogin__altLink">
          Need to make an account? Sign up{" "}
          <a
            className="SignupOrLogin__link"
            onClick={() => {
              setPageType(MODAL_PAGE_TYPE.SIGNUP);
            }}
          >
            here
          </a>
        </i>
      )}
      <div className="SignupOrLogin__footer">
        {onContinueAsGuest ? (
          <a
            className="SignupOrLogin__link nakedLink"
            onClick={onContinueAsGuest}
          >
            Continue as guest
          </a>
        ) : (
          <div />
        )}
        <span
          className="SignupOrLogin__cta"
          onClick={() => onSignupOrLogin(pageType, name, email, password)}
        >
          {pageType}
        </span>
      </div>
    </div>
  );
};

export default SignupOrLogin;
