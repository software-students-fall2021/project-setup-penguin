import { TextInput, TextArea } from "../../common";
import "./DeckEditor.css";

function DeckEditor({
  deckName,
  setDeckName,
  deckDescription,
  setDeckDescription,
}) {
  return (
    <div className="DeckEditor">
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
          placeholder="Engineering team for Pokédek"
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
        />
      </form>
    </div>
  );
}

export default DeckEditor;
