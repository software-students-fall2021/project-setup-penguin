import "./DeckEditor.css";

import { useState } from "react";

function DeckEditor() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  return (
    <div>
      <form>
        <input
          className="deck_input"
          onChange={(e) => setDeckName(e.target.value)}
          value={deckName}
          name="Deck Name"
          placeholder="Deck Name"
          type="text"
        />
        <input
          className="deck_input"
          onChange={(e) => setDeckDescription(e.target.value)}
          value={deckDescription}
          name="Deck Description"
          placeholder="Deck Description"
          type="text"
        />
      </form>
    </div>
  );
}

export default DeckEditor;
