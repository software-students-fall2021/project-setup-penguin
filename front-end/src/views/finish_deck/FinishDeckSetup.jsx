import { Redirect, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FORM_DEFAULT_PLACEHOLDERS,
  MODAL_PAGE_TYPE,
  PARENT_TYPE,
} from "../../common/constants";
import axios from "axios";
import { DeckEditor, AccountPromptModal, Button } from "../../common";
import { ArrowRight } from "react-bootstrap-icons";
import "./FinishDeckSetup.css";

function FinishDeckSetup() {
  const data = useLocation();
  const templateData = data?.state?.templateData;

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");

  if (redirectLink !== "") {
    return <Redirect to={redirectLink} />;
  }

  const saveDeck = (userId) => {
    let deckId;

    // user-entered template data would be contained in data.state.templateData
    // we want to fill in blanks with default vals
    Object.keys(templateData).forEach((key) => {
      if (templateData[key] === "") {
        templateData[key] = FORM_DEFAULT_PLACEHOLDERS[key];
      }
    });

    const formData = new FormData();
    formData.append("deckName", deckName);
    formData.append("deckDescription", deckDescription);

    // set textData = all entries from templateData except for image
    const { image, ...textData } = templateData;
    formData.append("cardText", JSON.stringify(textData));

    if (userId) {
      formData.append("userId", userId);
    }

    if (templateData.image) {
      formData.append("cardImage", templateData.image, "profile");
    }

    axios
      .post(`http://localhost:8000/deck`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        deckId = res.data.deckId;
        setRedirectLink(`deck/${deckId}`);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
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
      {/* TODO: FE validation for deckName requirement */}
      <DeckEditor
        deckName={deckName}
        setDeckName={setDeckName}
        deckDescription={deckDescription}
        setDeckDescription={setDeckDescription}
        onSubmit={(evt) => {
          evt.preventDefault();
          setShowModal(true);
        }}
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
        icon={<ArrowRight />}
      />
    </div>
  );
}

export default FinishDeckSetup;
