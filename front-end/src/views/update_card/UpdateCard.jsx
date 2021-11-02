import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, Button } from "../../common";
import { useParams, NavLink } from "react-router-dom";
import { EMPTY_CARD, TEST_CARDS_ARRAY } from "../../common/constants";
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
        setForm(TEST_CARDS_ARRAY[0]);
      });
  }, [deckId]);

  const saveCard = (userId) => {
    axios
      .post(`https://my.api.mockaroo.com/deck?key=$d5aa71f0&__method=POST`, {
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
          const cardId = saveCard(); //eventually will use user ID
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
