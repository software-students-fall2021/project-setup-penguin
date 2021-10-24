import DeckEditor from "../../common/deck-editor/DeckEditor";
import AccountPromptModal from "../../common/account-prompt-modal/AccountPromptModal";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FORM_DEFAULT_PLACEHOLDERS,
  MODAL_PAGE_TYPE,
  PARENT_TYPE,
} from "../../common/constants";

function FinishDeckSetup() {
  let data = useLocation();

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const saveDeck = (userId) => {
    // user-entered template data would be contained in data.state.templateData
    // we want to fill in blanks with default vals
    const templateData = data.state.templateData;
    Object.keys(templateData).forEach((key) => {
      if (templateData[key] === "") {
        templateData[key] = FORM_DEFAULT_PLACEHOLDERS[key];
      }
    });

    console.log({ templateData });

    // TODO: save deck data (updatedTemplate, name, desc)
    // link deck to userId if exists (and vice versa)

    // return id of newly created deck
  };

  const closeModalWithRedirect = (deckId) => {
    setShowModal(false);
    // TODO: redirect to newly created deck page given deckId
  };

  const onContinueAsGuest = () => {
    const deckId = saveDeck();
    closeModalWithRedirect(deckId);
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    let userId;

    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      // TODO: create & save account – get id of newly created account
    } else {
      // TODO: log user in – get id of existing account
    }

    const deckId = saveDeck(userId);
    closeModalWithRedirect(deckId);
  };

  return (
    <div>
      <DeckEditor
        deckName={deckName}
        setDeckName={setDeckName}
        deckDescription={deckDescription}
        setDeckDescription={setDeckDescription}
      />
      {showModal ? (
        <AccountPromptModal
          parentType={PARENT_TYPE.DECK}
          onContinueAsGuest={onContinueAsGuest}
          onSignupOrLogin={onSignupOrLogin}
        />
      ) : null}
      <button
        onClick={(event) => {
          setShowModal(true);
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default FinishDeckSetup;
