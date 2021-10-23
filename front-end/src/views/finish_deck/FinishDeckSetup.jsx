import DeckEditor from "../../common/deck-editor/DeckEditor";
import AccountPromptModal from "../../common/account-prompt-modal/AccountPromptModal";

import { useState } from "react";

function FinishDeckSetup() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    console.log(deckName, deckDescription);
    /* TODO: mock API for saving data */
    setShowModal(false);
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
        <AccountPromptModal parentType="deck" onCloseModal={onCloseModal} />
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
