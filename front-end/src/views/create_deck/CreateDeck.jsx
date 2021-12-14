import { useState } from "react";
import { Button, CreateBody } from "../../common";
import { EMPTY_TEMPLATE } from "../../common/constants";
import { ArrowRight } from "react-bootstrap-icons";

function CreateDeck() {
  const [form, setForm] = useState(EMPTY_TEMPLATE);
  const [shouldRunTour, setShouldRunTour] = useState(false);

  const prompt = (
    <>
      <p>
        Start off the deck with your own card! Your info will be used to
        populate the template card for your teammates (anything left blank will
        be filled with the placeholders shown).
      </p>
      <p>
        Need a little more guidance? Launch a guided creation tour{" "}
        <a
          className="link inline-link"
          onClick={() => {
            setShouldRunTour(true);
          }}
        >
          here
        </a>
        !
        <i><br></br><br></br>* denotes required field</i>
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
      icon={<ArrowRight />}
    />
  );
  return (
    <CreateBody
      header="Create a new deck"
      prompt={prompt}
      btn={btn}
      cardEditorProps={{ form, setForm, shouldRunTour }}
    />
  );
}

export default CreateDeck;
