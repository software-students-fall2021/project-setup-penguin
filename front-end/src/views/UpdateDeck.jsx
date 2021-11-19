import axios from "axios";
import { useEffect, useState } from "react";
import { DeckEditor, Button } from "../common";
import { Redirect, useParams } from "react-router-dom";
import LoadingSpinner from "../common/spinner/LoadingSpinner";

// TODO: restrict page to deck owner
function UpdateDeck({ token }) {
  const { deckId } = useParams();
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [deckName, setDeckName] = useState();
  const [deckDescription, setDeckDescription] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/deckDetails/${deckId}`)
      .then((res) => {
        setIsDeckLoaded(true);
        setDeckName(res.data.deckName);
        setDeckDescription(res.data.deckDescription);
      })
      .catch((err) => {
        setIsDeckLoaded(true);
        console.log("!!", err);
      });
  }, []);

  const updateDeckWithRedirect = () => {
    axios
      .patch(
        `http://localhost:8000/deck/${deckId}`,
        {
          deckName: deckName,
          deckDescription: deckDescription,
        },
        {
          headers: { Authorization: `JWT ${token}` },
        }
      )
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        setRedirect(true);
      });
  };

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  return !isDeckLoaded ? (
    <LoadingSpinner />
  ) : (
    <div className="FinishDeckSetup">
      <h1>Update deck details</h1>
      <div className="mb-5">
        <DeckEditor
          deckName={deckName}
          setDeckName={setDeckName}
          deckDescription={deckDescription}
          setDeckDescription={setDeckDescription}
          onSubmit={(evt) => {
            evt.preventDefault();
            updateDeckWithRedirect();
          }}
        />
      </div>
      <Button btnText="Update deck" onClick={updateDeckWithRedirect} />
    </div>
  );
}

export default UpdateDeck;
