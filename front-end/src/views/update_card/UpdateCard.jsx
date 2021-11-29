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

  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const [isCardLoaded, setIsCardLoaded] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deck/deckTemplate/${deckId}`)
      .then((res) => {
        setTemplateData(res.data.cardTemplate);
      })
      .catch((err) => {
        setTemplateData(TEST_TEMPLATE_DATA);
        setErrors(err.response.data.messages);
      })
      .finally(() => {
        setIsTemplateLoaded(true);
      });
  }, [deckId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/card/${cardId}`)
      .then((response) => {
        setForm(response.data.card);
      })
      .catch((err) => {
        setForm(TEST_TEMPLATE_DATA);
        setErrors(err.response.data.messages);
      })
      .finally(() => {
        setIsCardLoaded(true);
      });
  }, [cardId, deckId]);

  const saveCard = () => {
    const formData = new FormData();
    formData.append("deckId", deckId);

    // set textData = all entries from form except for image
    const { image, ...textData } = form;
    formData.append("cardText", JSON.stringify(textData));

    if (form.image) {
      formData.append("cardImage", form.image, "profile");
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/card/${cardId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${token}`,
        },
      })
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => {
        setErrors(err.response.data.messages);
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

  return isCardLoaded && isTemplateLoaded ? (
    <CreateBody
      header="Update Your Card"
      prompt={prompt}
      btn={btn}
      setErrors={setErrors}
      errors={errors}
      cardEditorProps={{ templateData, form, setForm }}
    />
  ) : (
    <LoadingSpinner />
  );
}

export default UpdateCard;
