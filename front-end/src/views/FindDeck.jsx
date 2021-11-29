import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, TextInput, ErrorMessage } from "../common";
import axios from "axios";
import { ArrowRight } from "react-bootstrap-icons";

function FindDeck() {
  const [maybeAccessCode, setMaybeAccessCode] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [errors, setErrors] = useState([]);

  if (redirectLink !== "") {
    return <Redirect to={redirectLink} />;
  }

  const onContinue = (evt) => {
    evt.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/deck/deckId/${maybeAccessCode}`
      )
      .then((res) => {
        if (res.data) {
          setRedirectLink(`/deck/${res.data._id}`);
        } else {
          setErrors([
            `Deck with access code ${maybeAccessCode} does not exist :(`,
          ]);
        }
      })
      .catch((err) => {
        setErrors(err.response.data.messages);
      });
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
              setErrors([]);
            }}
          />
          {<ErrorMessage errors={errors} className="mt-3" />}
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
