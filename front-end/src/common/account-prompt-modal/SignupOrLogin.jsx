import { useState, useEffect } from "react";
import { MODAL_PAGE_TYPE } from "../constants";
import { TextInput, ErrorMessage } from "../../common";
import "./SignupOrLogin.css";

const SignupOrLogin = ({
  pageType,
  setPageType,
  onContinueAsGuest,
  onSignupOrLogin,
  useAsPage = false,
  errors,
  setErrors,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const onClickShowPassword = (e) => {
    if (e.target.checked) {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onSignupOrLogin(pageType, name, email, password);
   }
  };

  // clear form and errors when switching btw login & signup pages
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordInputType("password");
    setErrors([]);
  }, [pageType]);

  return (
    <div className="SignupOrLogin">
      {useAsPage ? <h1>{pageType}</h1> : <h3>{pageType}</h3>}
      {pageType === MODAL_PAGE_TYPE.SIGNUP && (
        <TextInput
          placeholder="Name*"
          value={name}
          onChange={(event) => {
            setErrors([]);
            setName(event.target.value);
          }}
          onKeyPress={handleKeypress}
        />
      )}
      <TextInput
        placeholder="Email*"
        value={email}
        onChange={(event) => {
          setErrors([]);
          setEmail(event.target.value);
        }}
        onKeyPress={handleKeypress}
      />
      <TextInput
        placeholder="Password*"
        value={password}
        onChange={(event) => {
          setErrors([]);
          setPassword(event.target.value);
        }}
        type={passwordInputType}
        onKeyPress={handleKeypress}
      />
      <div className="SignupOrLogin__showPassword">
        <div>
          <input
            type="checkbox"
            onClick={(e) => onClickShowPassword(e)}
            checked={passwordInputType === "text"}
          />
          Show Password
        </div>
        <i>{'* denotes required field'}</i>
      </div>
      
      {<ErrorMessage errors={errors} className="mt-3" />}
      {pageType === MODAL_PAGE_TYPE.SIGNUP ? (
        <i className="SignupOrLogin__altLink">
          Already have an account? Log in{" "}
          <a
            className="link inline-link"
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
            className="link inline-link"
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
          <a className="link" onClick={onContinueAsGuest}>
            Continue as guest
          </a>
        ) : (
          <div />
        )}
        <span
          type="submit"
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
