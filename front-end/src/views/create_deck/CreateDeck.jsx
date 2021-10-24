import { useState } from "react";
import { CardEditor, Button } from "../../common";
import { EMPTY_TEMPLATE } from "../../common/constants";
import * as Icon from "react-bootstrap-icons";

function CreateDeck() {
  const [form, setForm] = useState(EMPTY_TEMPLATE);

  return (
    <div>
      <h1>Create a New Deck</h1>
      <div className="d-flex row align-items-center">
        <div className="col">
          <p>
            Start off the deck with your own card! Information entered here will
            be used as placeholder text in a template card for your teammates.
            Only you can edit fields such as "Strengths" and "Introvert" –
            everybody else will see these as plain labels.
          </p>
          <p>
            Don't worry if you don't feel like changing much! We'll fill any
            empty fields with the placeholders presented.
          </p>
          <Button
            btnText="Finalize deck details"
            linkTo={{
              pathname: "/finishdeck",
              state: { templateData: form }, // passing template data over to the next page
            }}
            icon={<Icon.ArrowRight />}
          />
        </div>
        <div className="col">
          <CardEditor form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
