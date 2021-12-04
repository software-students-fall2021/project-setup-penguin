import "./AccountPage.css";
import psyduck from "../../assets/psyduck.png";
import DisplayCard from "../../common/DisplayCard";
import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import { Button } from "../../common";
import { Redirect, useHistory } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";

function AccountPage({ token }) {
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);

  //make states an object and the page-displayed state variable a string (with its values as the keys of the states object) for clarity later
  const states = ["Active", "inactive"]; //array for defining classes of button states

  let pageContent;
  let pageElement;
  const history = useHistory();
  const [deckActive, setDeckActive] = useState(0);
  //0 = mydeck view, 1 = joinedcard view (for easy class switching for styling and content display using states array)

  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((response) => {
        setIsDeckLoaded(true);
        setUserCards(response.data);
      })
      .catch((err) => {
        console.log("!!", err);
        setIsDeckLoaded(true);
      });
    //Cleanup function to avoid warning/errors.
    return () => {
      setIsDeckLoaded(false);
      setUserCards();
    };
  }, []);

  //onClick functions for changing state for display
  const activateMyDeckView = () => {
    setDeckActive(0);
  };

  const activateJoinedDeckView = () => {
    setDeckActive(1);
  };

  //defines page content (either joined or owned)

  const ownedContent = [];
  const joinedContent = [];

 
  for (let i = 0; i < userCards.length; i++) {
    if(userCards[i].isOwned){
      pageElement = (
        <div key={i}>
          <div className="deck">
            <div className="title">
              <NavLink to={`deck/${userCards[i].cardData.deckId}`} className="deckLink">
                {userCards[i].deckName}
              </NavLink>
            </div>
            <div className="account-subtitle">{userCards[i].deckDescription}</div>
            <DisplayCard
              token={token}
              card={userCards[i].cardData}
              template={userCards[i].cardTemplate}
            ></DisplayCard>
          </div>
        </div>
      );
      ownedContent.push(pageElement);
    }
  }
  if(ownedContent.length === 0){
    pageElement = (
      <div className="no-decks">
        <p>
          Looks like you haven't created any decks yet. Click&nbsp;
          <a>
            <NavLink to={`createdeck`} className="clickHereLink">
              here
            </NavLink>
          </a>
          &nbsp;to get started!
        </p>
        <img className={"accountPageImg"} src={psyduck} alt="Psyduck" />
      </div>
    );
    ownedContent.push(pageElement);
  }
  


  for (let i = 0; i < userCards.length; i++) {
    if(!userCards[i].isOwned){
      pageElement = (
        <div key={i}>
          <div className="deck">
            <div className="title">
              <NavLink to={`deck/${userCards[i].cardData.deckId}`} className="deckLink">
                {userCards[i].deckName}
              </NavLink>
            </div>
            <div className="account-subtitle">{userCards[i].deckDescription}</div>
            <DisplayCard
              token={token}
              card={userCards[i].cardData}
              template={userCards[i].cardTemplate}
            ></DisplayCard>
          </div>
        </div>
      );
      joinedContent.push(pageElement);
    }
  }
  if(joinedContent.length === 0){
    pageElement = (
      <div className="no-decks">
        <p>
          You haven't joined any decks yet. Click&nbsp;
          <a>
            <NavLink to={`finddeck`} className="clickHereLink">
              here
            </NavLink>
          </a>
          &nbsp;to search for a deck via access code!
        </p>
        <img className={"accountPageImg"} src={psyduck} alt="Psyduck" />
      </div>
    );
    joinedContent.push(pageElement);
  }
  

  if (deckActive === 0) {
    pageContent = ownedContent;
  } else {
    pageContent = joinedContent;
  }

  const page = !isDeckLoaded ? (
    <LoadingSpinner />
  ) : (
    <div className="account-page-general">
      <div className="account-page-header">
        <h1>Account decks</h1>
        <Button
          btnText="Edit Account"
          onClick={() => history.push("/account/edit")}
          icon={<ArrowRight />}
        />
      </div>
      <div className="toggle-switch">
        <button
          className={states[deckActive]}
          id="myDeckView"
          onClick={activateMyDeckView}
          type="button"
        >
          Owned
        </button>
        <button
          className={states[1 - deckActive]}
          id="joinedDeckView"
          onClick={activateJoinedDeckView}
          type="button"
        >
          Joined
        </button>
      </div>
      <div className="account-deck-list">{pageContent}</div>
    </div>
  );

  return !token ? <Redirect to="/login" /> : page;
}

export default AccountPage;
