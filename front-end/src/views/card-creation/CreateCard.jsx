import { useState } from "react";
import { CreateBody, AccountPromptModal, Button } from "../../common";
import { Redirect, useParams } from "react-router-dom";
import {
  EMPTY_CARD,
  TEST_TEMPLATE_DATA,
  PARENT_TYPE,
  MODAL_PAGE_TYPE,
} from "../../common/constants";
import * as Icon from "react-bootstrap-icons";

function CreateCard() {
  const { deckId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_CARD);
  const [redirect, setRedirect] = useState(false);

  // TODO: get actual template data given deck id

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  const saveCard = (userId) => {
    console.log({ form, userId });
    // TODO: save card data to db under deck with deckId
    // link card to userId if exists (and vice versa)
    // return cardId
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
        cardEditorProps={{ templateData: TEST_TEMPLATE_DATA, form, setForm }}
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
