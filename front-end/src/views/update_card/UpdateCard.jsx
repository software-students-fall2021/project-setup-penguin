import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, Button } from "../../common";
import { useParams, Redirect } from "react-router-dom";
import { EMPTY_TEMPLATE, TEST_TEMPLATE_DATA } from "../../common/constants";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import { ArrowRight } from "react-bootstrap-icons";

function UpdateCard({ token }) {
  const { cardId, deckId } = useParams();
  const [form, setForm] = useState(EMPTY_TEMPLATE);
  const [templateData, setTemplateData] = useState();
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/deck/deckTemplate/${deckId}`)
      .then((res) => {
        setTemplateData(res.data.cardTemplate);
      })
      .catch((err) => {
        console.log("!!", err);
        setTemplateData(TEST_TEMPLATE_DATA);
      });
  }, [deckId]);

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
    const formData = new FormData();
    formData.append("deckId", deckId);

    // set textData = all entries from form except for image
    const { image, ...textData } = form;
    formData.append("cardText", JSON.stringify(textData));

    if (form.image) {
      formData.append("cardImage", form.image, "profile");
    }

    axios
      .patch(`http://localhost:8000/card/${cardId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${token}`,
        },
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
