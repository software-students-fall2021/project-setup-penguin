import { useEffect } from "react";

import "./Login.css";

function Login({ goToSignup, userName, setUsername }) {
  return (
    <div className="Login">
      <div className="Login__header">Log in</div>
      <input className="Login__input" placeholder="Email"></input>
      <input className="Login__input" placeholder="Password"></input>
      <div className="Login__button"> log in</div>
      <div className="Login__text">
        or sign up <span className="Login__link " onClick={goToSignup}>here</span>
      </div>
    </div>
  );
}

export default Login;
