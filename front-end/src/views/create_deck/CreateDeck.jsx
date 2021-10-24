import { useState } from "react";
import { Link } from "react-router-dom";
import CardEditor from "../../common/card-editor/CardEditor";
import { EMPTY_TEMPLATE } from "../../common/constants";

function CreateDeck() {
  const [form, setForm] = useState(EMPTY_TEMPLATE);

  return (
    <div>
      <h1>Create a New Deck</h1>
      <p>
        Edit the card below to capture information that’s important to your
        team. This template card will be shared with your teammates.
      </p>
      <CardEditor form={form} setForm={setForm} />
      {/* TODO: style the Link to look like a button */}
      <Link
        to={{
          pathname: "/finishdeck",
          state: { templateData: form }, // passing template data over to the next page
        }}
      >
        Finalize deck details
      </Link>
    </div>
  );
}

export default CreateDeck;
