import { useState } from "react";
import { Button, CreateBody } from "../../common";
import { EMPTY_TEMPLATE } from "../../common/constants";
import * as Icon from "react-bootstrap-icons";

function CreateDeck() {
  const [form, setForm] = useState(EMPTY_TEMPLATE);

  const prompt = (
    <>
      <p>
        Start off the deck with your own card! Information entered here will be
        used as placeholder text in a template card for your teammates. Only you
        can edit fields such as "Strengths" and "Introvert" – everybody else
        will see these as plain labels.
      </p>
      <p>
        Don't worry if you don't feel like changing much! We'll fill any empty
        fields with the placeholders presented.
      </p>
    </>
  );

  const btn = (
    <Button
      btnText="Finalize deck details"
      linkTo={{
        pathname: "/finishdeck",
        state: { templateData: form }, // passing template data over to the next page
      }}
      icon={<Icon.ArrowRight />}
    />
  );
  return (
    <>
      <h1>Create a New Deck</h1>
      <CreateBody
        prompt={prompt}
        btn={btn}
        cardEditorProps={{ form, setForm }}
      />
    </>
  );
}

export default CreateDeck;
