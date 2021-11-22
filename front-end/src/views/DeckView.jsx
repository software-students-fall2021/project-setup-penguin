import { useParams } from "react-router-dom";
import { DarkButton, Button, DisplayCard } from "../common";
import "./DeckView.css";
import axios from "axios";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../common/spinner/LoadingSpinner";
import share from "../assets/share.png";
import Search from "../common/components/SearchBar";
import debounce from "lodash.debounce";

function DeckView({ token }) {
  const CARD_LIMIT = 9;
  let { id } = useParams();
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingMoreCards, setIsFetchingMoreCards] = useState(false);
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [isPermissionsLoaded, setIsPermissionsLoaded] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [permissions, setPermissions] = useState({
    canAddCard: true,
    isDeckOwner: false,
  });

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

  // helper function to get more cards once the user reaches the bottom
  function fetchMoreCards() {
    if (hasNextPage) {
      axios
        .get(
          `http://localhost:8000/deck/${id}?page=${page}&limit=${CARD_LIMIT}&filter=${filterText}`
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

  const filterResultsHelper = (filterText) => {
    axios
      .get(
        `http://localhost:8000/deck/${id}?page=0&limit=${CARD_LIMIT}&filter=${filterText}`
      )
      .then((res) => {
        setPage(1);
        setDeck(res.data.deckData);
        setHasNextPage(res.data.hasNextPage);
      });
  };

  const debounceFilterResults = useMemo(
    () => debounce(filterResultsHelper, 300),
    []
  );

  // call the backend when filterText changes
  useEffect(() => {
    debounceFilterResults(filterText);
  }, [filterText]);

  // handles the behavior when the page first loads
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8000/deck/deckPermissions/${id}`, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => {
          setPermissions(res.data);
          setIsPermissionsLoaded(true);
        })
        .catch((err) => {
          console.log("!!", err);
        });
    } else {
      setIsPermissionsLoaded(true);
    }
  }, [token]);

  // handles behavior when the page first loads
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/deck/${id}?page=${page}&limit=${CARD_LIMIT}&filter=${filterText}`
      )
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
      .delete(`http://localhost:8000/deck/${id}`, {
        headers: { Authorization: `JWT ${token}` },
      })
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

  return isDeckLoaded && isPermissionsLoaded ? (
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
            {permissions.isDeckOwner && (
              <>
                <div className="edit">
                  <Button btnText="Edit Deck" linkTo={`${id}/edit`} />
                </div>
                <div className="delete">
                  <Button btnText="Delete Deck" onClick={() => deleteDeck()} />
                </div>
              </>
            )}
            <div className="add">
              {/* TODO: tooltip on hover disabled to explain why disabled */}
              <DarkButton
                btnText="Add Card"
                linkTo={`${id}/add`}
                disabled={!permissions.canAddCard}
              />
            </div>
          </div>
        </div>
        <div className="deckview-subtitle">{deck.deckDescription}</div>
      </div>
      <Search
        placeholder="Filter..."
        data={deck.cards}
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <div className="deck-list">
        {deck.cards.map((card) => (
          <DisplayCard
            card={card}
            template={deck.cardTemplate}
            token={token}
          ></DisplayCard>
        ))}
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}
export default DeckView;
