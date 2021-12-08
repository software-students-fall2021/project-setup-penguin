import { TextInput, TextArea, ErrorMessage } from "../../common";
import "./DeckEditor.css";

function DeckEditor({
  deckName,
  setDeckName,
  deckDescription,
  setDeckDescription,
  onSubmit,
  errors,
  setErrors,
}) {
  return (
    <div className="DeckEditor">
      <form className="DeckEditor__form" onSubmit={onSubmit}>
        <TextInput
          isLarge={true}
          placeholder="Name your deck*"
          value={deckName}
          onChange={(e) => {
            setErrors([]);
            setDeckName(e.target.value);
          }}
        />
        <i>* required</i>
        {<ErrorMessage errors={errors} className="mt-3" />}
        <div className="DeckEditor__descriptionHeader">
          Who is this deck for?
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
