import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, AccountPromptModal, Button } from "../../common";
import { Redirect, useParams } from "react-router-dom";
import {
  EMPTY_CARD,
  PARENT_TYPE,
  MODAL_PAGE_TYPE,
  TEST_TEMPLATE_DATA,
} from "../../common/constants";
import * as Icon from "react-bootstrap-icons";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";

function CreateCard() {
  const { deckId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_CARD);
  const [templateData, setTemplateData] = useState();
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

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  const saveCard = (userId) => {
    const formData = new FormData();
    formData.append("deckId", deckId);

    // set textData = all entries from form except for image
    const { image, ...textData } = form;
    formData.append("cardText", JSON.stringify(textData));

    if (userId) {
      formData.append("userId", userId);
    }

    if (form.image) {
      formData.append("cardImage", form.image, "profile");
    }

    axios
      .post(`http://localhost:8000/card`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setShowModal(false);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onContinueAsGuest = () => {
    saveCard();
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      axios
        .post("http://localhost:8000/user", {
          name,
          username: email,
          password,
        })
        .then((res) => {
          saveCard(res.data.username);
        });
    } else {
      axios
        .post("http://localhost:8000/user/login", {
          userId: email,
          password,
        })
        .then((res) => {
          saveCard(res.data.userId);
        });
    }
  };

  const prompt = (
    <p>
      Help your teammates get to know you by populating the template card with
      information about yourself!
    </p>
  );

  const btn = (
    <Button
      btnText="Save card to deck"
      onClick={() => {
        setShowModal(true);
      }}
      icon={<Icon.ArrowRight />}
    />
  );

  return !templateData ? (
    <LoadingSpinner />
  ) : (
    <>
      <CreateBody
        header="Create Your Card"
        prompt={prompt}
        btn={btn}
        cardEditorProps={{ templateData, form, setForm }}
      />
      <AccountPromptModal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        parentType={PARENT_TYPE.CARD}
        onCloseModal={() => setShowModal(false)}
        onContinueAsGuest={onContinueAsGuest}
        onSignupOrLogin={onSignupOrLogin}
      />
    </>
  );
}

export default CreateCard;
