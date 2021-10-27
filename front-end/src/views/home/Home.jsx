import card1 from "../../media/howto_card.png";
import card2 from "../../media/howto_card2.png";

import "./Home.css";

function Home({ goToInviteLink, goToGetStarted }) {
  return (
    <div className="Home">
      <div className="Home__header">How it works</div>
      <div className="Home__body">
        {" "}
        Get to know your teammates through Pokémon-inspired trading cards
        highlighting superpowers, weaknesses, communication preferences, and
        more to have a more efficient and enjoyable working experience!
      </div>

      <div className="Home__list">
        {" "}
        1. Create a card template for your team
      </div>

      <img className="Home_imgs" src={card1} alt="HomeCard1" />

      <div className="Home__list">
        {" "}
        2. Fill out the template with your info
      </div>

      <img className="Home_imgs" src={card1} alt="HomeCard1" />

      <div className="Home__list"> 3. Invite your teammates to join</div>

      <div className="Invite__button" onClick={goToInviteLink}>
        {" "}
        Invite Link
      </div>

      <div className="Home__list"> 4. Get to know 'em all'</div>

      <img className="Home_imgs" src={card2} alt="HomeCard2" />

      <div className="Invite__button" onClick={goToGetStarted}>
        {" "}
        Get Started
      </div>
    </div>
  );
}

export default Home;
