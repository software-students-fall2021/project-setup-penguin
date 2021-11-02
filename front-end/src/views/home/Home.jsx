import pokedex from "../../assets/pokedex.gif";
import team from "../../assets/team.png";
import card from "../../assets/card.png";
import { Button } from "../../common";
import * as Icon from "react-bootstrap-icons";
import "./Home.css";

// TODO: arrange horizontally ?
function Home() {
  return (
    <div className="Home">
      <div className="Home__title">
        <h1>How it works</h1>
        <Button
          btnText="Get started"
          linkTo="/createdeck"
          icon={<Icon.ArrowRight />}
        />
      </div>
      <p className="Home__body">
        Get to know your teammates through Pokémon-inspired trading cards
        highlighting superpowers, weaknesses, communication preferences, and
        more to have a more efficient and enjoyable working experience!
      </p>
      <p>1. Set up a template card for your team by creating your own card</p>
      <img className="Home_imgs" src={card} alt="Card" />
      <p>
        2. Share a link to with your teammates so that they can add their own
        cards to your deck
      </p>
      <img className="Home_imgs" src={team} alt="Team" />
      <p> 3. Get to know 'em all!</p>
      <img className="Home_imgs" src={pokedex} alt="Pokedex" />
    </div>
  );
}

export default Home;
