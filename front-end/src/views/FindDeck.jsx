import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, TextInput, ErrorMessage } from "../common";
import axios from "axios";
import { ArrowRight } from "react-bootstrap-icons";

function FindDeck() {
  const [maybeAccessCode, setMaybeAccessCode] = useState("");
  const [deckIds, setDeckIds] = useState([]);
  const [accessCodes, setAccessCodes] = useState([]);
  const [redirectLink, setRedirectLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/accessCodes`)
      .then((res) => {
        const accessCodes = res.data.map((deck) => deck.accessCode);
        const deckIds = res.data.map((deck) => deck._id);
        console.log({ accessCodes });
        setAccessCodes(accessCodes);
        setDeckIds(deckIds);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (redirectLink !== "") {
    return <Redirect to={redirectLink} />;
  }

  const onContinue = (evt) => {
    evt.preventDefault();
    const maybeIdx = accessCodes.indexOf(maybeAccessCode);
    if (maybeIdx >= 0) {
      setRedirectLink(`/deck/${deckIds[maybeIdx]}`);
    } else {
      setError(`Deck with join code ${maybeAccessCode} does not exist :(`);
    }
  };

  return (
    <div className="FinishDeckSetup">
      <h1>Find an existing deck</h1>
      <p className="mb-5">Enter your deck's access code below!</p>
      <div className="DeckEditor">
        <form className="DeckEditor__form" onSubmit={(evt) => onContinue(evt)}>
          <TextInput
            isLarge={true}
            placeholder="Access Code"
            value={maybeAccessCode}
            onChange={(e) => {
              setMaybeAccessCode(e.target.value);
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
        btnText="Find my deck"
        onClick={onContinue}
        icon={<ArrowRight />}
      />
    </div>
  );
}

export default FindDeck;
