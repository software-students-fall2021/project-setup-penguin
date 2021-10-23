import TextInput from "../TextInput";
import TextArea from "../TextArea";

import "./DeckEditor.css";

function DeckEditor({
  deckName,
  setDeckName,
  deckDescription,
  setDeckDescription,
}) {
  return (
    <div>
      <form className="DeckEditor__form">
        <TextInput
          isLarge={true}
          placeholder="Name your deck"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <div className="DeckEditor__descriptionHeader">
          What's your deck for?
        </div>
        <TextArea
          isLarge={true}
          placeholder="Engineering team for Pokédek"
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
        />
      </form>
    </div>
  );
}

export default DeckEditor;
