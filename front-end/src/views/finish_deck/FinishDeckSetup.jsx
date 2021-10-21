import { useState } from "react";

import DeckEditor from "../../common/deck-editor/DeckEditor";
import AccountPromptModal from "../../common/account-prompt-modal/AccountPromptModal";

function FinishDeckSetup() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Finish Deck Setup</h1>
      <DeckEditor />
      {showModal ? <AccountPromptModal parentType="deck" /> : null}
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
