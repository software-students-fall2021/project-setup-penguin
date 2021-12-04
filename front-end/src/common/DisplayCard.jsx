import "./DisplayCard.css";
import heart from "../assets/heart.png";
import piplup from "../assets/piplup.png";
import Slider from "rc-slider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../views/DeleteModal";

function DisplayCard({ card = {}, template = {}, token }) {
  const cardId = card._id;
  const deckId = card.deckId;
  const currToken = token;

  const [shouldRenderButtons, setShouldRenderButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sectionIds = [0, 1, 2];
  const HeartIcon = () => <img src={heart} width="25px" height="25px" />;

  useEffect(() => {
    if (token && cardId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/card/cardPermissions/${cardId}`,
          {
            headers: { Authorization: `JWT ${token}` },
          }
        )
        .then((res) => {
          setShouldRenderButtons(res.data.canEditDeleteCard);
        })
        .catch((err) => {
          console.log("!!", err);
        });
    }
  }, [token, cardId]);

  function deleteCard(confirmed) {
    console.log("confirmed", confirmed);
    if (confirmed){
      console.log("here!")
      axios
      .delete(`${process.env.REACT_APP_API_URL}/api/card/${cardId}`, {
        data: { deckId },
        headers: { Authorization: `JWT ${currToken}` },
      })
      .then(() => {
        alert("You've just deleted a card!");
        window.location.reload();
      })
      .catch((err) => {
        console.log("!!", err);
      });
    }
    else{
      setShowModal(false);
    }
  }

  return (
    <div className="DisplayCard">
      <div className="CardDisplay__form" id="myCard">
        <div className="CardDisplay__upperContent">
          <div className="CardDisplay__tagline">{card.tagline}</div>
          <div className="CardDisplay__header">
            <div className="CardDisplay__name">{card.name}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="CardDisplay__city">{card.city}</div>
              <HeartIcon />
            </div>
          </div>
          <img
            className="CardDisplay__image"
            src={
              card.filename
                ? `${process.env.REACT_APP_API_URL}/uploads/${card.filename}`
                : piplup
            }
          />
        </div>
        <div className="CardDisplay__summary">{card.summary}</div>
        {sectionIds.map((id) => (
          <div className="CardDisplay__section">
            <HeartIcon />
            <div className="CardDisplay__sectionContent">
              <div className="CardDisplay__label">
                {template[`sectionLabel${id}`]}
              </div>
              <div className="CardDisplay__textarea">
                {card[`sectionContent${id}`]}
              </div>
            </div>
          </div>
        ))}
        <div class="slider-group">
          <div class="slider-labels">
            <div className="CardDisplay__label">{template.sliderLabelMin}</div>
            <div className="CardDisplay__label__right">
              {template.sliderLabelMax}
            </div>
          </div>
          <Slider
            value={card.sliderValue}
            handleStyle={{ borderColor: "pink" }}
            railStyle={{ backgroundColor: "pink" }}
            trackStyle={{ backgroundColor: "pink" }}
            disabled="true"
          />
        </div>
        {shouldRenderButtons && (
          <div className="card-options">
            <Link to={`/deck/${deckId}/card/${cardId}/edit`}>
              <button className="edit-card">Edit</button>
            </Link>
            <button
              className="delete-card"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <DeleteModal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        deleteResponse={deleteCard}
        type="card"
      ></DeleteModal>
    </div>
  );
}

export default DisplayCard;
