import { useParams, NavLink } from "react-router-dom";
import { DarkButton, Button, DisplayCard } from "../common";
import "./DeckView.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../common/spinner/LoadingSpinner";
import share from "../assets/share.png";

function DeckView() {
  let { id } = useParams();
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [deck, setDeck] = useState({
    deckName: "Untitled",
    deckDescription: "",
    cards: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/${id}`)
      .then((res) => {
        console.log("res", res.data);
        setIsDeckLoaded(true);
        setDeck(res.data);
      })
      .catch((err) => {
        console.log("!!", err);
        setIsDeckLoaded(true);
      });
  }, []);

  function deleteDeck() {
    axios
      .delete(`http://localhost:8000/deck/${id}`)
      .then(() => {
        //After deleting, redirect user back to homepage.
        alert("You've just deleted a deck!");
        window.location.href = "http://localhost:3000";
      })
      .catch((err) => {
        console.log("!!", err);
      });
  }

  function shareDeck() {
    // TODO: Have url copied for user when click on button!

    document.getElementById("shared-text").innerHTML =
      "Copied deck access code!";
    setTimeout(function () {
      document.getElementById("shared-text").innerHTML = "";
    }, 3000);
  }

  return !isDeckLoaded ? (
    <LoadingSpinner />
  ) : (
    <div className="deckview-overall">
      <div className="header">
        <div className="title-container">
          <div className="deckview-title">
            {deck.deckName}
            <button className="fake-button" onClick={() => shareDeck()}>
              <img className="deck-share" src={share} />
            </button>
            <div id="shared-text"></div>
          </div>
          {/* TODO: only show button for admin */}
          <div className="deckview-buttons">
            <div className="edit">
              <Button btnText="Edit Deck" linkTo={`${id}/edit`} />
            </div>
            <div className="delete">
              <Button btnText="Delete Deck" onClick={() => deleteDeck()} />
            </div>
            <div className="add">
              <DarkButton btnText="Add Card" linkTo={`${id}/add`} />
            </div>
          </div>
        </div>
        <div className="deckview-subtitle">{deck.deckDescription}</div>
      </div>
      <div className="deck-list">
        {deck.cards.map((card) => (
          <DisplayCard card={card} template={deck.cardTemplate}></DisplayCard>
        ))}
      </div>
    </div>
  );
}
export default DeckView;
