import "./Signup.css";

function Signup() {
  return (
    <div className="Signup">
      <div className="Signup__header">Sign up</div>
      <input className="Signup__input" placeholder="Name"></input>
      <input className="Signup__input" placeholder="Email"></input>
      <input className="Signup__input" placeholder="Password"></input>
      <div className="Signup__button"> sign up</div>
      <div className="Signup__text">
        or log in{" "}
        <a className="Login__link " href="/login">
          here
        </a>
      </div>
      <div className="Signup__faqHeader">Why sign up?</div>

      <div className="Signup__faqText">
        1. Update your decks & cards anytime
      </div>
      <div className="Signup__faqText">
        2. Get notified when others join your team
      </div>
    </div>
  );
}

export default Signup;
