import axios from "axios";
import { useEffect, useState } from "react";
import { DeckEditor, Button } from "../common";
import { Redirect, useParams } from "react-router-dom";

// TODO: restrict page to deck owner
function UpdateDeck() {
  const { deckId } = useParams();
  const [deckName, setDeckName] = useState();
  const [deckDescription, setDeckDescription] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/deck/123?key=d5aa71f0")
      .then((response) => {
        setDeckName(response.data.deckName);
        setDeckDescription(response.data.deckDescription);
      });
  }, []);

  const updateDeckWithRedirect = () => {
    axios
      .post(`https://my.api.mockaroo.com/deck?key=$d5aa71f0&__method=POST`, {
        deckName: deckName,
        deckDescription: deckDescription,
      })
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  return (
    <div>
      <h1>Update deck details</h1>
      <div className="mb-5">
        <DeckEditor
          deckName={deckName}
          setDeckName={setDeckName}
          deckDescription={deckDescription}
          setDeckDescription={setDeckDescription}
        />
      </div>
      <Button btnText="Update deck" onClick={updateDeckWithRedirect} />
    </div>
  );
}

export default UpdateDeck;
