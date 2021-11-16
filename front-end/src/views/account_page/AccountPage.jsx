import "./AccountPage.css";
import DisplayCard from "../../common/DisplayCard";
import React, { useState } from 'react';
import { useParams, NavLink } from "react-router-dom";
import {
    TEST_CARDS_ARRAY,
  } from "../../common/constants";
import axios from "axios";
import { useEffect } from "react";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";

function AccountPage() { 
    const [isDeckLoaded, setIsDeckLoaded] = useState(false);

//make states an object and the page-displayed state variable a string (with its values as the keys of the states object) for clarity later
    const states = ["Active", "inactive"]; //array for defining classes of button states

    //let { id } = useParams();
    let { id } = useParams();
    let pageContent;
    let pageElement;
    const [deckActive, setDeckActive] = useState(0); 
    //0 = mydeck view, 1 = joinedcard view (for easy class switching for styling and content display using states array)

    const [ownedDeckNamesArray, setOwnedDeckNameData] = useState([]);
    const [ownedDeckIdsArray, setOwnedDeckIdData] = useState([]);
    const [ownedCardsArray, setOwnedCardsData] = useState([]); //user cards in owned decks
    const [joinedDeckNamesArray, setJoinedDeckNameData] = useState([]);
    const [joinedDeckIdsArray, setJoinedDeckIdData] = useState([]);
    const [joinedCardsArray, setJoinedCardsData] = useState([]); //user cards in joined decks

    useEffect(() => {
      axios
        .get(`http://localhost:8000/user/${id}`)
        .then((response) => {
          setIsDeckLoaded(true);
          let userCards = response.data;

          //creating arrays to make html elements
          let ownedTitles = [];
          let ownedCards = [];
          let ownedIds = [];
          let joinedCards = [];
          let joinedTitles = [];
          let joinedIds = [];

          //separates owned content from joined content
          for (const id in userCards) {
            if(userCards[id].isOwned){
              ownedTitles.push(userCards[id].deckName);
              ownedCards.push(userCards[id].cardData);
              ownedIds.push(userCards[id].cardData.deckId);
            }
            else{
              joinedTitles.push(userCards[id].deckName);
              joinedCards.push(userCards[id].cardData);
              joinedIds.push(userCards[id].cardData.deckId);
            }
          }

          setOwnedDeckNameData(ownedTitles);
          setOwnedDeckIdData(ownedIds);
          setOwnedCardsData(ownedCards);
          setJoinedDeckNameData(joinedTitles);
          setJoinedDeckIdData(joinedIds);
          setJoinedCardsData(joinedCards);
        })
        .catch((err) => {
          console.log("!!", err);
          setIsDeckLoaded(true);
        });
        //Cleanup function to avoid warning/errors.
        return () => {
          setIsDeckLoaded(false);
          setOwnedDeckNameData();
          setOwnedDeckIdData();
          setOwnedCardsData();
          setJoinedDeckNameData();
          setJoinedDeckIdData();
          setJoinedCardsData();
        }
    }, []);

//onClick functions for changing state for display
    const activateMyDeckView = () =>{
        setDeckActive(0);
    }

    const activateJoinedDeckView = () =>{
        setDeckActive(1);
    }

    //<DisplayCard tempArray={ownedCardsArray[i]}></DisplayCard>
//defines page content (either cards or decks)

    const ownedContent = [];
    const joinedContent = [];

    for(let i = 0; i < ownedDeckNamesArray.length; i++){
      pageElement = <><div className="deck"><NavLink to={`deck/${ownedDeckIdsArray[i]}`} className="title">{ownedDeckNamesArray[i]}</NavLink>
      <DisplayCard tempArray={ownedCardsArray[i]}></DisplayCard>
      </div>
      </>;
      ownedContent.push(pageElement);
    }

    for(let i = 0; i < joinedDeckNamesArray.length; i++){
      pageElement = <><div className="deck"><NavLink to={`deck/${joinedDeckIdsArray[i]}`} className="title">{joinedDeckNamesArray[i]}</NavLink>
      <DisplayCard tempArray={joinedCardsArray[i]}></DisplayCard>
      </div>
      </>;
      joinedContent.push(pageElement);
    }
    
    if(deckActive === 0){
        pageContent = ownedContent;
    }
    else{
        pageContent = joinedContent;
    }
    

    return !isDeckLoaded ? (
      <LoadingSpinner />
    ) :(
        <div className="container">
        <div className="toggle-switch">
          <button className={states[deckActive]} id="myDeckView" onClick={activateMyDeckView} type="button">Owned Decks</button>
          <button className={states[1-deckActive]} id="joinedDeckView" onClick={activateJoinedDeckView} type="button">Joined Decks</button>
        </div>
          <div className="deck-list">
            {pageContent}
            </div>
        </div>
    );
}

export default AccountPage;

