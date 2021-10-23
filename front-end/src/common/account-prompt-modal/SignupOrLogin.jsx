import { useState } from "react";
import TextInput from "../TextInput";

import "./SignupOrLogin.css";

const SignupOrLogin = ({ pageType, setPageType }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="SignupOrLogin">
      <h3>{pageType}</h3>
      {pageType === "Sign up" && (
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
      {pageType === "Sign up" ? (
        <i className="SignupOrLogin__altLink">
          Already have an account? Log in{" "}
          <a
            className="AccountPromptModal__link"
            onClick={() => {
              setPageType("Log in");
            }}
          >
            here
          </a>
        </i>
      ) : (
        <i className="SignupOrLogin__altLink">
          Need to make an account? Sign up{" "}
          <a
            className="AccountPromptModal__link"
            onClick={() => {
              setPageType("Sign up");
            }}
          >
            here
          </a>
        </i>
      )}
    </div>
  );
};

export default SignupOrLogin;
