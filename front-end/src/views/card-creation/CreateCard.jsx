import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, AccountPromptModal, Button } from "../../common";
import { Redirect, useParams } from "react-router-dom";
import {
  EMPTY_CARD,
  PARENT_TYPE,
  MODAL_PAGE_TYPE,
} from "../../common/constants";
import { ArrowRight } from "react-bootstrap-icons";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";

function CreateCard({ token, setToken }) {
  const { deckId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_CARD);
  const [templateData, setTemplateData] = useState();
  const [redirect, setRedirect] = useState(false);
  const [shouldRunTour, setShouldRunTour] = useState(false);

  const [modalErrors, setModalErrors] = useState([]);
  const [pageErrors, setPageErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deck/deckTemplate/${deckId}`)
      .then((res) => {
        setTemplateData(res.data.cardTemplate);
      })
      .catch((err) => {
        setPageErrors(err.response.data.messages);
      });
  }, [deckId]);

  if (redirect) {
    return <Redirect to={`/deck/${deckId}`} />;
  }

  const saveCard = (token) => {
    const formData = new FormData();
    formData.append("deckId", deckId);

    // set textData = all entries from form except for image and name
    // this is to enable multer image upload and express-validator body validation on name
    const { image, name, ...textData } = form;
    formData.append("cardText", JSON.stringify(textData));
    formData.append("name", name);

    if (token) {
      formData.append("token", token);
    }

    if (form.image) {
      formData.append("cardImage", form.image, "profile");
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/card`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setShowModal(false);
        setRedirect(true);
      })
      .catch((err) => {
        setShowModal(false);
        setPageErrors(err.response.data.messages);
      });
  };

  const onContinueAsGuest = () => {
    saveCard();
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user`, {
          email,
          password,
          name,
        })
        .then((res) => {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          saveCard(res.data.token);
        })
        .catch((err) => {
          setModalErrors(err.response.data.messages);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
          email,
          password,
        })
        .then((res) => {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          saveCard(res.data.token);
        })
        .catch((err) => {
          setModalErrors(err.response.data.messages);
        });
    }
  };

  const prompt = (
    <>
      <p>
        Help your teammates get to know you by populating the template card with
        information about yourself!
      </p>
      <p>
        Need a little more guidance? Launch a guided creation tour{" "}
        <a
          className="link inline-link"
          onClick={() => {
            setShouldRunTour(true);
          }}
        >
          here
        </a>
        !
      </p>
    </>
  );

  const btn = (
    <Button
      btnText="Save card to deck"
      onClick={() => {
        if (token) {
          saveCard(token);
        } else {
          setShowModal(true);
        }
      }}
      icon={<ArrowRight />}
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
        errors={pageErrors}
        setErrors={setPageErrors}
        cardEditorProps={{ templateData, form, setForm, shouldRunTour }}
      />
      <AccountPromptModal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        parentType={PARENT_TYPE.CARD}
        onCloseModal={() => setShowModal(false)}
        onContinueAsGuest={onContinueAsGuest}
        onSignupOrLogin={onSignupOrLogin}
        errors={modalErrors}
        setErrors={setModalErrors}
      />
    </>
  );
}

export default CreateCard;
