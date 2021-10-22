import "./DeckEditor.css";

function DeckEditor({
  deckName,
  setDeckName,
  deckDescription,
  setDeckDescription,
}) {
  return (
    <div>
      <form>
        <input
          className="DeckEditor__input"
          onChange={(e) => setDeckName(e.target.value)}
          value={deckName}
          name="Deck Name"
          placeholder="Deck Name"
          type="text"
        />
        <input
          className="DeckEditor__input"
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
