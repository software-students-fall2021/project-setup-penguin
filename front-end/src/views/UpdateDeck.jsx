import axios from "axios";
import { useEffect, useState } from "react";
import { DeckEditor, Button, ErrorMessage } from "../common";
import { Redirect, useParams } from "react-router-dom";
import LoadingSpinner from "../common/spinner/LoadingSpinner";

// TODO: restrict page to deck owner
function UpdateDeck({ token }) {
  const { deckId } = useParams();
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [deckName, setDeckName] = useState();
  const [deckDescription, setDeckDescription] = useState();
  const [redirect, setRedirect] = useState(false);

  const [pageErrors, setPageErrors] = useState([]);
  const [editorErrors, setEditorErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deck/deckDetails/${deckId}`)
      .then((res) => {
        setIsDeckLoaded(true);
        setDeckName(res.data.deckName);
        setDeckDescription(res.data.deckDescription);
      })
      .catch((err) => {
        setIsDeckLoaded(true);
        setPageErrors(["Error retrieving deck details"]);
      });
  }, []);

  const updateDeckWithRedirect = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/deck/${deckId}`,
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
        setEditorErrors(err.response.data.messages);
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
      <ErrorMessage errors={pageErrors} />
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
          errors={editorErrors}
          setErrors={setEditorErrors}
        />
      </div>
      <Button btnText="Update deck" onClick={updateDeckWithRedirect} />
    </div>
  );
}

export default UpdateDeck;
