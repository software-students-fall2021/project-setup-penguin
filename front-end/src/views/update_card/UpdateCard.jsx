import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, Button } from "../../common";
import { useParams, Redirect } from "react-router-dom";
import { EMPTY_TEMPLATE, TEST_TEMPLATE_DATA } from "../../common/constants";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import { ArrowRight } from "react-bootstrap-icons";

function UpdateCard() {
  const { cardId, deckId } = useParams();
  const [form, setForm] = useState(EMPTY_TEMPLATE);
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/card/${cardId}`)
      .then((response) => {
        setForm(response.data.card);
        setIsCardLoaded(true);
      })
      .catch((err) => {
        console.log("!!", err);
        setForm(TEST_TEMPLATE_DATA);
        setIsCardLoaded(true);
      });
  }, [cardId, deckId]);

  const saveCard = (userId) => {
    axios
      .patch(`http://localhost:8000/card/${cardId}`, {
        newCard: form,
        userId,
      })
      .then((res) => {
        setRedirect(true);
        return res["data"];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  //extract 'templateData' to pass to cardEditorProps so that deck specific fields aren't editable
  const templateData = {
    sectionLabel0: form["sectionLabel0"],
    sectionLabel1: form["sectionLabel1"],
    sectionLabel2: form["sectionLabel2"],
    sliderLabelMin: form["sliderLabelMin"],
    sliderLabelMax: form["sliderLabelMax"],
  };

  const prompt = (
    <p>
      Edit your card so your teammates can get the best information about you!
    </p>
  );

  const btn = (
    <Button
      btnText="Save card changes to deck"
      onClick={() => {
        saveCard();
      }}
      icon={<ArrowRight />}
    />
  );

  return !isCardLoaded ? (
    <LoadingSpinner />
  ) : (
    <CreateBody
      header="Update Your Card"
      prompt={prompt}
      btn={btn}
      cardEditorProps={{ templateData, form, setForm }}
    />
  );
}

export default UpdateCard;
