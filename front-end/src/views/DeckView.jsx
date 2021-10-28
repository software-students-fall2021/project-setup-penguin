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

function DeckView() {
  let { id } = useParams();
  console.log({ id });
  const [templateArray, setTemplateData] = useState([]);
  const [deckTitle, setDeckName] = useState();
  const [deckSubtitle, setDeckDescription] = useState();

  useEffect(() => {
    axios
      .get(`https://my.api.mockaroo.com/deck/123?key=d5aa71f0`)
      .then((response) => {
        console.log("data", response.data.cards);
        setTemplateData(response.data.cards);
        setDeckName(response.data.deckName);
        setDeckDescription(response.data.deckDescription);
      })
      .catch((err) => {
        console.log("!!", err);
        setTemplateData(TEST_CARDS_ARRAY);
        setDeckName("SWE");
        setDeckDescription("Team for SWE Project, Fall 2021");
      });
  }, []);

  return (
    <div>
      <div className="header">
        <div className="title-container">
          <div className="title">{deckTitle}</div>
          {/* TODO: only show button for admin */}
          <Button btnText="Edit" linkTo={`${id}/edit`} />
        </div>
        <div className="subtitle">{deckSubtitle}</div>
      </div>
      <div class="deck-list">
        {templateArray.map((tempType) => (
          <DisplayCard tempArray={tempType}></DisplayCard>
        ))}
      </div>
      <div className="add-card">
        <Button btnText="Add Card" linkTo={`${id}/add`} />
      </div>
    </div>
  );
}
export default DeckView;
