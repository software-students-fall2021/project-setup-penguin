import { useParams, NavLink } from "react-router-dom";
import DisplayCard from "../common/DisplayCard";
import "./DeckView.css";

function DeckView() {
  let { id } = useParams();
  console.log({ id });

  const TempOne = {
    name: "Bob Ross",
    city: "NYC",
    tagline: "I love to paint, and I love to laugh.",
    summary: "Designer (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Making happy mistakes",
    sectionContent1: "Nothing",
    sectionContent2: "bobross@happymistakes.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 80,
  };

  const TempTwo = {
    name: "Bob Ross",
    city: "NYC",
    tagline: "I love to paint, and I love to laugh.",
    summary: "Designer (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Making happy mistakes",
    sectionContent1: "Nothing",
    sectionContent2: "bobross@happymistakes.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 80,
  };

  const TempThree = {
    name: "Bob Ross",
    city: "NYC",
    tagline: "I love to paint, and I love to laugh.",
    summary: "Designer (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Making happy mistakes",
    sectionContent1: "Nothing",
    sectionContent2: "bobross@happymistakes.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 80,
  };

  const TempFour= {
    name: "Bob Ross",
    city: "NYC",
    tagline: "I love to paint, and I love to laugh.",
    summary: "Designer (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Making happy mistakes",
    sectionContent1: "Nothing",
    sectionContent2: "bobross@happymistakes.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 80,
  };

  const TempFive = {
    name: "Bob Ross",
    city: "NYC",
    tagline: "I love to paint, and I love to laugh.",
    summary: "Designer (# YOE), 9AM-5PM EST",
    sectionLabel0: "Strengths",
    sectionLabel1: "Weaknesses",
    sectionLabel2: "Communication Preferences",
    sectionContent0: "Making happy mistakes",
    sectionContent1: "Nothing",
    sectionContent2: "bobross@happymistakes.com",
    sliderLabelMin: "Introvert",
    sliderLabelMax: "Extrovert",
    sliderValue: 80,
  };

  const allCards = [TempOne, TempTwo, TempThree, TempFour, TempFive];
  return (
    <div>
      {" "}
      <p>this is a deck with id={id}</p>{" "}
      <div class="deck-list">
      {allCards.map((tempType) => (
        <DisplayCard tempArray={tempType}></DisplayCard>
      ))}
      </div>
      <NavLink to={`${id}/add`}>Add Card</NavLink>
    </div>
  );
}
export default DeckView;
