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
          let userDecks = response.data.users.decks;
          let userCards = response.data.users.cards;

          let ownedTitles = [];

          //finds all users owned decks
          for (const id in userDecks) {
            ownedTitles.push(response.data.decks[userDecks[id]].deckName);
          }

          let ownedCards = [];

          for (const id in userDecks) {
            //checks for matching cards to have corresponding cards and decks in same position of arrays for display
            let cardNum = 0;
            while (response.data.cards[userCards[cardNum]].deckId !== userDecks[id]){
              cardNum++;
            }
            ownedCards.push(response.data.cards[userCards[cardNum]]);
          }

          let joinedCards = [];

          for (const id in userCards) {
            //checks if card is already included in ownedCards
            let isOwned = false;
            for (const count in ownedCards) {
              if (userCards[id] === ownedCards[count]) {
                isOwned = true;
                break;
              }
            }
            if (!isOwned){
              joinedCards.push(response.data.cards[userCards[id]]);
            }
          }

        let joinedDecks = [];
        let joinedIds = [];

        for (const id in joinedCards) {
          //finds corresponding deck names for owned cards that aren't in owned decks
          joinedDecks.push(response.data.decks[joinedCards[id].deckId].deckName);
          joinedIds.push(joinedCards[id].deckId);
        }

          setOwnedDeckNameData(ownedTitles);
          setOwnedDeckIdData(userDecks);
          setOwnedCardsData(ownedCards);
          setJoinedDeckNameData(joinedDecks);
          setJoinedDeckIdData(joinedIds);
          setJoinedCardsData(joinedCards);
        })
        .catch((err) => {
          console.log("!!", err);
          setOwnedDeckNameData(["Painters", "Pokemon", "Pop Stars", "Rich People", "Missing"]);
          setOwnedDeckIdData(["123", "123", "123", "123", "123"]);
          setOwnedCardsData(TEST_CARDS_ARRAY);
          setJoinedDeckNameData(["Nice Guys", "Nintendo Mascots", "The Voice", "University Presidents", "Unknowns"]);
          setJoinedDeckIdData(["123", "123", "123", "123", "123"]);
          setJoinedCardsData(TEST_CARDS_ARRAY);
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

