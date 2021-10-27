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
  const [templateArray, setTemplateData] = useState({});

  useEffect(() => {
    axios
      .get(`https://my.api.mockaroo.com/deck/${id}?key=d5aa71f0`)
      .then((response) => {
        console.log("data", response.data);
        setTemplateData(response.data);
      })
      .catch((err) => {
        console.log("!!", err);
        setTemplateData(TEST_CARDS_ARRAY);
      })
  }, [id]);

  //Convert object type of templateArray to array type so we can use the map function later
  const resultArray = Object.values(templateArray);

  //Temporary title and subtitle values
  const title = "SWE";
  const subtitle = "Team for SWE Project, Fall 2021";

  return (
    <div>
      <div className="header">
        <div className="title-container">
          <div className="title">{title}</div>
          {/* TODO: only show button for admin */}
          <Button btnText="Edit" linkTo={`${id}/edit`} />
        </div>
        <div className="subtitle">{subtitle}</div>
      </div>
      <div class="deck-list">
        {resultArray.map((tempType) => (
          <DisplayCard tempArray={tempType}></DisplayCard>
        ))}
      </div>
      <a href="${id}/add">
        <button class="Button">
          Add Card
        </button>
      </a>
    </div>
  );
}
export default DeckView;
