import "./AccountPage.css";
import DisplayCard from "../../common/DisplayCard";
import React, { useState } from 'react';
import { useParams, NavLink } from "react-router-dom";
import {FORM_DEFAULT_PLACEHOLDERS} from "../../common/constants";

const title = "SWE";

function AccountPage() { 
    const states = ["Active", "inactive"]; //array for defining classes of button states
    let { id } = useParams();
    console.log({ id });
    let pageContent;
    const [deckActive, setDeckActive] = useState(0); 
    //0 = deck view, 1 = card view (for easy class switching for styling and content display using states array)

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
        pageContent = <><NavLink to={`deck/${id}`} className="title">{title}</NavLink></>;
        
    }
    else{
        pageContent = <><h3 className="subtitle">Card 1</h3><DisplayCard tempArray={FORM_DEFAULT_PLACEHOLDERS}/></>;
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

