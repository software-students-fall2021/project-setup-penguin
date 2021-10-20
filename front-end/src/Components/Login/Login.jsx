import "./Login.css";

function Login({ goToSignup }) {
  return (
    <div className="Login">
      <div className="Login__header">Log in</div>
      <input className="Login__input" placeholder="Email"></input>
      <input className="Login__input" placeholder="Password"></input>
      <div className="Login__button"> log in</div>
      <div className="Login__text">
        or signup <a onClick={goToSignup}>here</a>
      </div>
    </div>
  );
}

export default Login;
