import { useState } from "react";
import { CardEditor, AccountPromptModal } from "../../common";
import { Redirect, useLocation } from "react-router-dom";
import {
  EMPTY_CARD,
  TEST_TEMPLATE_DATA,
  PARENT_TYPE,
  MODAL_PAGE_TYPE,
} from "../../common/constants";

function CreateCard() {
  let data = useLocation();
  // TODO: maybe want to get deck id from url rather than location

  const deckId = data.state.deckId;
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_CARD);
  const [redirect, setRedirect] = useState(false);

  // TODO: get actual template data given deck id

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  const saveCard = (userId) => {
    console.log({ form, userId });
    // save card data to db under deck with deckId
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
      // create & save account – get id of newly created account
    } else {
      // log user in – get id of existing account
    }

    const cardId = saveCard(userId);
    closeModalWithRedirect(cardId);
  };

  return (
    <div>
      <h1>Create Your Card</h1>
      <p>adding to deck with id {deckId}</p>
      <p>Fill it in!</p>
      <CardEditor
        templateData={TEST_TEMPLATE_DATA}
        form={form}
        setForm={setForm}
      />
      {showModal && (
        <AccountPromptModal
          parentType={PARENT_TYPE.CARD}
          onCloseModal={() => setShowModal(false)}
          onContinueAsGuest={onContinueAsGuest}
          onSignupOrLogin={onSignupOrLogin}
        />
      )}
      <div
        onClick={(event) => {
          setShowModal(true);
        }}
      >
        Continue
      </div>
    </div>
  );
}

export default CreateCard;
