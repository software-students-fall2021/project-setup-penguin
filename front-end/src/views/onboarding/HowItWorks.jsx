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
      <h1>How it works</h1>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pikachu}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>CREATE A DECK</h3>
            <p>Set up a template card for your team. Decide the qualities you want to share and learn about your teammates!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={squirtle}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>SHARE YOUR DECK</h3>
            <p>Share a link with your teammates so that they can add their own cards to your deck.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={chikorita}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>MEET THE TEAM</h3>
            <p>
            Look through a deck to find our more about your teammates. You can edit your card, or even edit and delete deck details. Get to know 'em all!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="HowItWorks__title">
        <Button 
          btnText="Get started"
          linkTo="/getstarted"
          icon={<ArrowRight />}
        />
      </div>
    </div>
    // <div className="HowItWorks">
    //   <div className="HowItWorks__title">
    //     <h1>How it works</h1>
    //     <Button
    //       btnText="Get started"
    //       linkTo="/getstarted"
    //       icon={<ArrowRight />}
    //     />
    //   </div>
      // {/* <div className="HowItWorks__body">
      //   {howToSteps.map((item, index) => (
      //     <div className="HowItWorks__row">
      //       <h2 className="HowItWorks__rowIndex">{index + 1}</h2>
      //       <div className="HowItWorks__rowHeaderContainer">
      //         <h2 className="HowItWorks__rowHeader">{item.header}</h2>
      //         <h4 className="HowItWorks__rowSubHeader">{item.subHeader}</h4>
      //       </div>
      //       <div className="HowItWorks__rowContent">{item.content}</div>
      //       {item.button?.text && item.button.link && (
      //         <button className="HowItWorks__rowButton">
      //           {item.button.text}
      //         </button>
      //       )}
      //     </div>
      //   ))}
      // </div> */}
    // </div>
  );
}

export default HowItWorks;
