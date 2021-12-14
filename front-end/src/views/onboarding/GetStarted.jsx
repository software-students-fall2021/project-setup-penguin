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
            <p className="GetStarted__text">
              If your team isn't on Pokédek yet, take the lead here!
            </p>
          </Link>
        </div>

        <div className="GetStarted__card">
          <Link to="/finddeck" className="GetStarted__button">
            <img src={pokeball} className="GetStarted__img" />
            <p className="GetStarted__label">Find an existing deck</p>
            <p className="GetStarted__text">
              If your teammate already started a deck, choose this.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
