import { Redirect, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FORM_DEFAULT_PLACEHOLDERS,
  MODAL_PAGE_TYPE,
  PARENT_TYPE,
} from "../../common/constants";
import axios from "axios";
import { DeckEditor, AccountPromptModal, Button } from "../../common";
import * as Icon from "react-bootstrap-icons";
import "./FinishDeckSetup.css";

function FinishDeckSetup() {
  let data = useLocation();

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");

  if (redirectLink !== "") {
    return <Redirect to={redirectLink} />;
  }

  const saveDeck = (userId) => {
    console.log("userId:", userId);
    let deckId;

    // user-entered template data would be contained in data.state.templateData
    // we want to fill in blanks with default vals
    const templateData = data?.state?.templateData;
    Object.keys(templateData).forEach((key) => {
      if (templateData[key] === "") {
        templateData[key] = FORM_DEFAULT_PLACEHOLDERS[key];
      }
    });

    const apiKey = process.env.REACT_APP_MOCKAROO_API_KEY;
    console.log(apiKey);

    axios
      .post(`http://localhost:8000/deck`, {
        userId,
        deckName,
        deckDescription,
        cardTemplate: templateData,
      })
      .then((res) => {
        deckId = res.data.deckId;
        setRedirectLink(`deck/${deckId}`);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);

        // while mockaroo is down...
        setRedirectLink(`deck/${123}`);
        setShowModal(false);
      });
  };

  const onContinueAsGuest = () => {
    saveDeck();
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      axios
        .post("http://localhost:8000/user", {
          name,
          username: email,
          password,
        })
        .then((res) => {
          saveDeck(res.data.username);
        });
    } else {
      axios
        .post("http://localhost:8000/user/login", {
          userId: email,
          password,
        })
        .then((res) => {
          saveDeck(res.data.userId);
        });
    }
  };

  return (
    <div className="FinishDeckSetup">
      <h1>Finalize deck details</h1>
      <DeckEditor
        deckName={deckName}
        setDeckName={setDeckName}
        deckDescription={deckDescription}
        setDeckDescription={setDeckDescription}
      />
      <AccountPromptModal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        parentType={PARENT_TYPE.DECK}
        onContinueAsGuest={onContinueAsGuest}
        onSignupOrLogin={onSignupOrLogin}
      />
      <Button
        btnText="Create deck"
        onClick={() => {
          setShowModal(true);
        }}
        icon={<Icon.ArrowRight />}
      />
    </div>
  );
}

export default FinishDeckSetup;
