import "./Login.css";

function Login() {
  return (
    <div>
      <h1>Log in</h1>
      <div className="Login__body">
        <input className="Login__input" placeholder="Email"></input>
        <input className="Login__input" placeholder="Password"></input>
        <div className="Login__button"> log in</div>
        <div className="Login__text">
          or sign up{" "}
          <a className="Login__link " href="/signup">
            here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
