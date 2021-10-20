import { useEffect } from "react";
import card1 from "../../media/howto_card.png";
import card2 from "../../media/howto_card2.png";

import "./Howto.css";

function Howto({ goToInviteLink, goToGetStarted }) {
  return (
    <div className="Howto">
      <div className="Howto__header">How it works</div>
      <div className="Howto__body">
        {" "}
        Get to know your teammates through Pokémon-inspired trading cards
        highlighting superpowers, weaknesses, communication preferences, and
        more to have a more efficient and enjoyable working experience!
      </div>

      <div className="Howto__list">
        {" "}
        1. Create a card template for your team
      </div>

      <img className="Howto_imgs" src={card1} alt="HowtoCard1" />

      <div className="Howto__list">
        {" "}
        2. Fill out the template with your info
      </div>

      <img className="Howto_imgs" src={card1} alt="HowtoCard1" />

      <div className="Howto__list"> 3. Invite your teammates to join</div>

      <div className="Invite__button" onClick={goToInviteLink}>
        {" "}
        Invite Link
      </div>

      <div className="Howto__list"> 4. Get to know 'em all'</div>

      <img className="Howto_imgs" src={card2} alt="HowtoCard2" />

      <div className="Invite__button" onClick={goToGetStarted}>
        {" "}
        Get Started
      </div>
    </div>
  );
}

export default Howto;
