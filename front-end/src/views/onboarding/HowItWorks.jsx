import { Button } from "../../common";
import { ArrowRight } from "react-bootstrap-icons";
import "./HowItWorks.css";
import { Carousel } from "react-bootstrap";
import pikachu from "../../assets/pikachu.png";
import squirtle from "../../assets/squirtle.png";
import chikorita from "../../assets/chikorita.png";

// TODO: arrange horizontally ?
function HowItWorks() {
  return (
    <div className="HowItWorks">
      <div className="HowItWorks__title">
        <h1>How it works</h1>
        <Button
          btnText="Get started"
          linkTo="/getstarted"
          icon={<ArrowRight />}
        />
      </div>
      <Carousel pause="hover">
        <Carousel.Item>
          <img className="d-block w-100" src={pikachu} alt="First slide" />
          <Carousel.Caption>
            <h3>CREATE A DECK</h3>
            <p>
              Set up a template card for your team. Decide the qualities you
              want to share and learn about your teammates!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={squirtle} alt="Second slide" />

          <Carousel.Caption>
            <h3>SHARE YOUR DECK</h3>
            <p>
              Share a link or access code with your teammates so that they can
              add their own cards to your deck.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={chikorita} alt="Third slide" />

          <Carousel.Caption>
            <h3>MEET THE TEAM</h3>
            <p>
              Look through a deck to find our more about your teammates. You can
              edit your card, or even edit and delete deck details. Get to know
              'em all!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HowItWorks;
