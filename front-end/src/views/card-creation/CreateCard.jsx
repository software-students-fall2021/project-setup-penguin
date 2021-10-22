import { NavLink } from "react-router-dom";
import { CardEditor } from "../../common";

const testTemplateData = {
  name: "Janet Huang",
  city: "NYC",
  tagline: "K-drama and dessert enthusiast",
  summary: "Software Engineer (2 YOE), 9AM-5PM ",
  sectionLabel0: "Superpowers",
  sectionLabel1: "Things you suck at",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "eating & sleeping",
  sectionContent1: "speaking",
  sectionContent2: "never ideally",
  sliderLabelMin: "me",
  sliderLabelMax: "we",
};
function CreateCard() {
  return (
    <div>
      <h1>Create Your Card</h1>
      <p>Fill it in!</p>
      <h3>Populating a Template</h3>
      <CardEditor templateData={testTemplateData} />
      <h3>Creating a Template</h3>
      <CardEditor />
      {/* TODO: style the NavLink to look like a button */}
      <NavLink to="/finishdeck">Continue</NavLink>
    </div>
  );
}

export default CreateCard;
