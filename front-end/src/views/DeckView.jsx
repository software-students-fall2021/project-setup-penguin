import { useParams, NavLink } from "react-router-dom";
import { DarkButton, Button, DisplayCard } from "../common";
// import Button from "../common/components";
import "./DeckView.css";
import axios from "axios";
import { useState } from "react";
import {  TEST_CARDS_ARRAY } from "../common/constants";
import { useEffect } from "react";
import LoadingSpinner from "../common/spinner/LoadingSpinner";
import share from "../assets/share.png";

function DeckView() {
  let { id } = useParams();
  console.log({ id });
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [cardsArray, setCardsData] = useState([]);
  const [deckTitle, setDeckName] = useState();
  const [deckSubtitle, setDeckDescription] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/${id}`)
      .then((response) => {
        //Parse through the JSON array to get the current IDs
        //Use IDs to get currect deck, and create cards array containing appropriate cards
        let deckArray = response.data.decks[id];
        //Array of cardIDs within this deck
        const cardIDArray = response.data.decks[id].cards;
        //Array of actual card objects within this deck
        let cards = [];
        for (const id in cardIDArray){
          let currCard = response.data.cards[cardIDArray[id]];
          cards.push(currCard);
        }

        setIsDeckLoaded(true);
        setCardsData(cards);
        setDeckName(deckArray.deckName);
        setDeckDescription(deckArray.deckDescription);
      })
      .catch((err) => {
        console.log("!!", err);
        setIsDeckLoaded(true);
        setCardsData(TEST_CARDS_ARRAY);
        setDeckName("SWE");
        setDeckDescription("Team for SWE Project, Fall 2021");
      });
      //Cleanup function to avoid warning/errors.
      return () => {
        setIsDeckLoaded(false);
        setCardsData([]);
        setDeckName();
        setDeckDescription();
      }
  }, []);

  function deleteDeck(){
    axios
      .delete(`http://localhost:8000/deck/${id}`)
      .then(() => {
        //After deleting, redirect user back to homepage.
        window.location.href="http://localhost:3000"
      })
      .catch((err) => {
        console.log("!!", err)
      })
  }

  function shareDeck(){
    // TODO: Have url copied for user when click on button!

    document.getElementById("shared-text").innerHTML="Copied share link!";
    setTimeout(function(){
      document.getElementById("shared-text").innerHTML="";
    }, 3000)
  }

  return !isDeckLoaded ? (
    <LoadingSpinner />
  ) : (
    <div className="deckview-overall">
      <div className="header">
        <div className="title-container">
          <div className="deckview-title">{deckTitle}
            <button className="fake-button" onClick={() => shareDeck() }>
              <img className="deck-share" src={share} />
            </button><div id="shared-text"></div>
          </div>
          {/* TODO: only show button for admin */}
          <div className="deckview-buttons">
            <div className="edit"><Button btnText="Edit" linkTo={`${id}/edit`} /></div>
            <div className="delete"><Button btnText="Delete" onClick={() => deleteDeck() }/></div>
            <div className="add"><DarkButton btnText="Add Card" linkTo={`${id}/add`} /></div>
          </div>
        </div>
        <div className="deckview-subtitle">{deckSubtitle}</div>
      </div>
      <div class="deck-list">
        {cardsArray.map((tempType) => (
          <DisplayCard tempArray={tempType}></DisplayCard>
        ))}
      </div>
      {/* <div className="add-card">
        <Button btnText="Add Card" linkTo={`${id}/add`} />
      </div> */}
    </div>
  );
}
export default DeckView;
