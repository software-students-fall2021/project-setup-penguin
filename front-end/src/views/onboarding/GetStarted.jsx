import "./GetStarted.css";
import pokeball from "../../assets/pokeball.png";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="GetStarted">
      <h1>Get Started</h1>
      <p>Choose your starter action!</p>
      <div className="GetStarted__cardsContainer">
        <div className="GetStarted__card">
          <Link to="/createdeck" className="GetStarted__button">
            <img src={pokeball} className="GetStarted__img" />
            <p className="GetStarted__label">Create a new deck</p>
          </Link>
        </div>

        <div className="GetStarted__card">
          <Link to="/joindeck" className="GetStarted__button">
            <img src={pokeball} className="GetStarted__img" />
            <p className="GetStarted__label">Join an existing deck</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
