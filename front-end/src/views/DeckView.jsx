import { useParams, NavLink } from "react-router-dom";
import { Button, DisplayCard } from "../common";
import "./DeckView.css";
import axios from "axios";
import { useState } from "react";
import {
  EMPTY_CARD,
  PARENT_TYPE,
  MODAL_PAGE_TYPE,
  TEST_TEMPLATE_DATA,
  TEST_CARDS_ARRAY,
} from "../common/constants";
import { useEffect } from "react";
import LoadingSpinner from "../common/spinner/LoadingSpinner";

function DeckView() {
  let { id } = useParams();
  console.log({ id });
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [templateArray, setTemplateData] = useState([]);
  const [deckTitle, setDeckName] = useState();
  const [deckSubtitle, setDeckDescription] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/${id}`)
      .then((response) => {
        console.log("data", response.data);

        //Parse through the JSON array to get the current IDs
        //Use IDs to get currect deck, and create cards array containing appropriate cards
        let deckArray = response.data.decks[id];
        console.log("deckArray", deckArray);
        //Array of cardIDs within this deck
        let cardIDArray = response.data.decks[id].cards;
        console.log("cardIDArray", cardIDArray);
        //Array of actual card objects within this deck
        let cards = [];
        for (const id in cardIDArray){
          console.log("id", cardIDArray[id]);
          let currCard = response.data.cards[cardIDArray[id]];
          console.log("currCard", currCard);
          cards.push(currCard);
        }

        console.log("cards", cards);

        setIsDeckLoaded(true);
        setTemplateData(cards);
        setDeckName(deckArray.deckName);
        setDeckDescription(deckArray.deckDescription);
      })
      .catch((err) => {
        console.log("!!", err);
        setIsDeckLoaded(true);
        setTemplateData(TEST_CARDS_ARRAY);
        setDeckName("SWE");
        setDeckDescription("Team for SWE Project, Fall 2021");
      });
  }, []);

  return !isDeckLoaded ? (
    <LoadingSpinner />
  ) : (
    <div className="deckview-overall">
      <div className="header">
        <div className="title-container">
          <div className="deckview-title">{deckTitle}</div>
          {/* TODO: only show button for admin */}
          <div className="deckview-buttons">
            <div className="edit"><Button btnText="Edit" linkTo={`${id}/edit`} /></div>
            <div className="add"><Button btnText="Add Card" linkTo={`${id}/add`} /></div>
            <div className="delete"><Button btnText="Delete"/></div>
          </div>
        </div>
        <div className="deckview-subtitle">{deckSubtitle}</div>
      </div>
      <div class="deck-list">
        {templateArray.map((tempType) => (
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
