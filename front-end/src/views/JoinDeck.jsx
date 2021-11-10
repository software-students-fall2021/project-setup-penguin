import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, TextInput, ErrorMessage } from "../common";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

function JoinDeck() {
  const [maybeDeckId, setMaybeDeckId] = useState("");
  const [deckIds, setDeckIds] = useState([]);
  //   const [password, setPassword] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/deckIds`)
      .then((res) => {
        setDeckIds(res.data.deckIds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (redirectLink !== "") {
    return <Redirect to={redirectLink} />;
  }

  const onContinue = (evt) => {
    evt.preventDefault();
    if (deckIds.includes(maybeDeckId)) {
      setRedirectLink(`/deck/${maybeDeckId}`);
    } else {
      setError(`Deck with id ${maybeDeckId} does not exist :(`);
    }
  };

  return (
    <div className="FinishDeckSetup">
      <h1>Join an existing deck</h1>
      <p className="mb-5">
        Ask your teammate for a direct link to your team's page, or navigate
        there by entering your deck's ID below!
      </p>
      <div className="DeckEditor">
        <form className="DeckEditor__form" onSubmit={(evt) => onContinue(evt)}>
          {/* should this be numeric? */}
          <TextInput
            isLarge={true}
            placeholder="Deck Id"
            value={maybeDeckId}
            onChange={(e) => {
              setMaybeDeckId(e.target.value);
              setError("");
            }}
          />
          {<ErrorMessage error={error} className="mt-3" />}
          {/* 
          if we implement password-restrictions on decks
          <TextInput
            isLarge={true}
            placeholder="Password (optiona)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        </form>
      </div>
      <Button
        btnText="Go to team deck"
        onClick={onContinue}
        icon={<Icon.ArrowRight />}
      />
    </div>
  );
}

export default JoinDeck;
