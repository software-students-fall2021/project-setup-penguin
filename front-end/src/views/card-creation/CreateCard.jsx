import { useState } from "react";
import { CardEditor, AccountPromptModal, Button } from "../../common";
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

  return (
    <div>
      <h1>Create Your Card</h1>
      <div className="d-flex row align-items-center">
        <div className="col">
          <p>
            Help your {deckId} teammates get to know you by populating the
            template card with information about yourself!
          </p>
          {/* TODO: explore moving button to bottom on condensed screen */}
          <Button
            btnText="Save card to deck"
            onClick={() => {
              setShowModal(true);
            }}
            icon={<Icon.ArrowRight />}
          />
        </div>
        <div className="col">
          <CardEditor
            templateData={TEST_TEMPLATE_DATA}
            form={form}
            setForm={setForm}
          />
        </div>
      </div>
      {showModal && (
        <AccountPromptModal
          parentType={PARENT_TYPE.CARD}
          onCloseModal={() => setShowModal(false)}
          onContinueAsGuest={onContinueAsGuest}
          onSignupOrLogin={onSignupOrLogin}
        />
      )}
    </div>
  );
}

export default CreateCard;
