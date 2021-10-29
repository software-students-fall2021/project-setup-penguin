import "./AccountPage.css";
import DisplayCard from "../../common/DisplayCard";
import React, { useState } from 'react';
import { useParams, NavLink } from "react-router-dom";
import {
    TEST_CARDS_ARRAY,
  } from "../../common/constants";
import axios from "axios";
import { useEffect } from "react";

function AccountPage() { 
    const states = ["Active", "inactive"]; //array for defining classes of button states
    let { id } = useParams();
    console.log({ id });
    let pageContent;
    const [deckActive, setDeckActive] = useState(0); 
    //0 = deck view, 1 = card view (for easy class switching for styling and content display using states array)

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
      })
  }, []);

//onClick functions for changing state for display
    const activateDeckView = () =>{
        setDeckActive(0);
    }

    const activateCardView = () =>{
        setDeckActive(1);
    }

/*defines page content (either cards or decks)
  TO DO: update with actual card and deck display once DeckView and DisplayCard are updated,
    will use arrays to display multiple cards/decks when user functionality is further along */
    if(deckActive === 0){
        pageContent = <><NavLink to={`deck/${id}`} className="title">{deckTitle}</NavLink>
        <h2>{deckSubtitle}</h2></>;
        
    }
    else{
        pageContent = <><div class="deck-list">
        {templateArray.map((tempType) => (
          <DisplayCard tempArray={tempType}></DisplayCard>
        ))}
      </div></>;
    }
    return(
        <div className="container">
        <div className="toggle-switch">
          <button className={states[deckActive]} id="deckView" onClick={activateDeckView} type="button">My Decks</button>
          <button className={states[deckActive-1]} id="cardView" onClick={activateCardView} type="button">My Cards</button>
        </div>
            {pageContent}
        </div>
    );
}

export default AccountPage;

