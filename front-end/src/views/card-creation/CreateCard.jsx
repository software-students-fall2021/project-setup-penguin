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

function CreateCard() {
  const { deckId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_CARD);
  const [templateData, setTemplateData] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`https://my.api.mockaroo.com/deck/${deckId}?key=d5aa71f0`)
      .then((response) => {
        console.log("data", response.data);
        setTemplateData(response.data.template);
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

  const closeModalWithRedirect = () => {
    setShowModal(false);
    setRedirect(true);
  };

  const onContinueAsGuest = () => {
    const cardId = saveCard();
    closeModalWithRedirect(cardId);
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    let userId;

    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      // TODO: create & save account – get id of newly created account
    } else {
      // log user in – get id of existing account
    }

    const cardId = saveCard(userId);
    closeModalWithRedirect(cardId);
  };

  const prompt = (
    <p>
      Help your {deckId} teammates get to know you by populating the template
      card with information about yourself!
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

  return (
    <>
      <h1>Create Your Card</h1>
      <CreateBody
        prompt={prompt}
        btn={btn}
        cardEditorProps={{ templateData, form, setForm }}
      />
      {showModal && (
        <AccountPromptModal
          parentType={PARENT_TYPE.CARD}
          onCloseModal={() => setShowModal(false)}
          onContinueAsGuest={onContinueAsGuest}
          onSignupOrLogin={onSignupOrLogin}
        />
      )}
    </>
  );
}

export default CreateCard;
