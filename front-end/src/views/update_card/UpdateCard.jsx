import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, Button } from "../../common";
import { useParams, NavLink } from "react-router-dom";
import { EMPTY_CARD } from "../../common/constants";
import * as Icon from "react-bootstrap-icons";

function UpdateCard() {
  const { cardId, deckId } = useParams();
  const [form, setForm] = useState(EMPTY_CARD);

  useEffect(() => {
    axios
      .get(`https://my.api.mockaroo.com/card/${cardId}?key=d5aa71f0`)
      .then((response) => {
        console.log("data", response.data);
        setForm(response.data);
      })
      .catch((err) => {
        console.log("!!", err);
        setForm(EMPTY_CARD);
      });
  }, [cardId, deckId]);

  const saveCard = (userId) => {
    axios
      .patch(`http://localhost:8000/card/${cardId}`, {
        newCard: form,
        userId,
      })
      .then((res) => {
        return res["data"];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prompt = (
    <p>
      Edit your card so your {deckId} teammates can get the best information
      about you!
    </p>
  );

  const btn = (
    <NavLink to={`/deck/${deckId}`}>
      <Button
        btnText="Save card changes to deck"
        onClick={() => {
          saveCard();
        }}
        icon={<Icon.ArrowRight />}
      />
    </NavLink>
  );

  return (
    <CreateBody
      header="Update Your Card"
      prompt={prompt}
      btn={btn}
      cardEditorProps={{ form, setForm }}
    />
  );
}

export default UpdateCard;
