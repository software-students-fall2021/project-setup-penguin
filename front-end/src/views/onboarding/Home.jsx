import card from "../../assets/card.png";
import kevinCard from "../../assets/kevin-card.png";
import janetCard from "../../assets/janet-card.png";
import "./Home.css";
import { Button, DarkButton, useViewport } from "../../common";

function Home() {
  const { width } = useViewport();
  const isMobile = width < 1000;

  return (
    <div className={isMobile ? "Home__mobile" : "Home"}>
      <div className={isMobile ? "Home__section--mobile" : "Home__section"}>
        <h1 className="Home__main-title">Get to know your team in the best way possible</h1>
        <p>
          We make team-building more easy and fun through Pokémon-inspired cards
          for people.
        </p>
        <div className={isMobile ? "Home__btn-group__mobile" : "Home__btn-group"}>
          <span className="Home__btn">
            <Button btnText="How it works" linkTo="/howitworks" />
          </span>
          <span className="Home__btn">
            <DarkButton btnText="Get started" linkTo="/getstarted" />
          </span>
        </div>
      </div>
      <img
        className={isMobile ? "Home__img--mobile" : "Home__img"}
        src={kevinCard}
        alt="Card"
      />
      {/* <img
        className={isMobile ? "Home__img--mobile" : "Home__img"}
        src={janetCard}
        alt="Card"
      /> */}
    </div>
  );
}

export default Home;
