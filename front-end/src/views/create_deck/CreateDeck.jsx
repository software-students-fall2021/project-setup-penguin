import { NavLink } from "react-router-dom";

import CardEditor from "../../common/card-editor/CardEditor";

/* TODO: implement onSave function passed to CardEditor */
function onSave() {}

function CreateDeck() {
  return (
    <div>
      <h1>Create a New Deck</h1>
      <p>
        Edit the card below to capture information that’s important to your
        team. This template card will be shared with your teammates.
      </p>
      <CardEditor onSave={onSave} />
      {/* TODO: style the NavLink to look like a button */}
      <NavLink to="/finishdeck">Continue</NavLink>
    </div>
  );
}

export default CreateDeck;
