import axios from "axios";
import { useState, useEffect } from "react";
import { CreateBody, Button } from "../../common";
import { useParams, NavLink} from "react-router-dom";
import {
  EMPTY_CARD,
  TEST_TEMPLATE_DATA,
} from "../../common/constants";
import * as Icon from "react-bootstrap-icons";

function UpdateCard() {
  const { deckId } = useParams();
  const [form, setForm] = useState(EMPTY_CARD);
  const [templateData, setTemplateData] = useState({});
  

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
          Edit your card so your {deckId} teammates can get the best information about you!
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
        /></NavLink>
      );
    
      return (
        <>
          <h1>Update Your Card</h1>
          <CreateBody
            prompt={prompt}
            btn={btn}
            cardEditorProps={{ templateData, form, setForm }}
          />
        </>
      );
}



export default UpdateCard;