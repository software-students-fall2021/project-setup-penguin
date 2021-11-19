import { useParams } from "react-router-dom";
import { DarkButton, Button, DisplayCard } from "../common";
import "./DeckView.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../common/spinner/LoadingSpinner";
import share from "../assets/share.png";

function DeckView({ token }) {
  const CARD_LIMIT = 9;
  let { id } = useParams();
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingMoreCards, setIsFetchingMoreCards] = useState(false);
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [deck, setDeck] = useState({
    deckName: "Untitled",
    deckDescription: "",
    cards: [],
  });

  // detects when the user has scrolled to the bottom of the page
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetchingMoreCards(true);
  }

  function fetchMoreCards() {
    if (hasNextPage) {
      axios
        .get(
          `http://localhost:8000/deck/${id}?page=${page}&limit=${CARD_LIMIT}`
        )
        .then((res) => {
          setIsFetchingMoreCards(false);
          // append the new cards to the deck state
          setDeck({
            ...deck,
            cards: [...deck.cards, ...res.data.deckData.cards],
          });
          // increment the page by 1
          setPage(page + 1);
          setHasNextPage(res.data.hasNextPage);
        });
    } else {
      setIsFetchingMoreCards(false);
    }
  }

  // handles the behavior when the page first loads
  useEffect(() => {
    // fetches the first batch of cards from the API
    axios
      .get(`http://localhost:8000/deck/${id}?page=${page}&limit=${CARD_LIMIT}`)
      .then((res) => {
        setIsDeckLoaded(true);
        setDeck(res.data.deckData);
        setPage(page + 1);
        setHasNextPage(res.data.hasNextPage);
      })
      .catch((err) => {
        console.log("!!", err);
        setIsDeckLoaded(true);
      });

    // attaches event listener to window for when user scrolls to the bottom
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // handles the behavior when fetching more cards from API
  useEffect(() => {
    if (!isFetchingMoreCards) return;
    fetchMoreCards();
  }, [isFetchingMoreCards]);

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
    navigator.clipboard.writeText(deck.accessCode);
    document.getElementById(
      "shared-text"
    ).innerHTML = `Copied deck access code: ${deck.accessCode}!`;
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
          <DisplayCard card={card} template={deck.cardTemplate} token={token}></DisplayCard>
        ))}
      </div>
    </div>
  );
}
export default DeckView;
