import { NavLink } from "react-router-dom";

function CreateDeck() {
  return (
    <div>
      <h1>Create a New Deck</h1>
      <p>
        Edit the card below to capture information that’s important to your
        team. This template card will be shared with your teammates.
      </p>
      {/* TODO: add the CardEditor component */}
      {/* TODO: style the NavLink to look like a button */}
      <NavLink to="/finishdeck">Continue</NavLink>
    </div>
  );
}

export default CreateDeck;
