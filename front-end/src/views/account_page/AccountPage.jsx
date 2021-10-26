import "./AccountPage.css";
import CardEditor from "../../common/card-editor/CardEditor";
import React, { useState } from 'react';
import { useParams, NavLink } from "react-router-dom";


function AccountPage() { 
    const states = ["Active", "inactive"]; //array for defining classes of button states
    let { id } = useParams();
    let pageContent;
    const [deckActive, setDeckActive] = useState(0);

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
        pageContent = <><h3>Deck 1</h3><h1>this is a deck with id={id}</h1>{" "}</>;
    }
    else{
        pageContent = <><h3>Card 1</h3><CardEditor /></>;
    }
    return(
        <div className="container">
        <div className="toggle-switch">
          <button className={states[deckActive]} id="deckView" onClick={activateDeckView} type="button">My Decks</button>
          <button className={states[1-deckActive]} id="cardView" onClick={activateCardView} type="button">My Cards</button>
        </div>
            {pageContent}
        </div>
    );
}

export default AccountPage;

