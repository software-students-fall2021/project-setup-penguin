import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextInput, Button } from "../../common";
import { ArrowRight } from "react-bootstrap-icons";
import DeleteModal from "../DeleteModal"
import axios from "axios";
import "./editAccount.css";

function EditAccount({ token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/account`,
      headers: { Authorization: `JWT ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          setName(res?.data?.name);
          setEmail(res?.data?.email);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const submitUpdate = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/`,
      data: {
        email,
        name,
      },
      headers: { Authorization: `JWT ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          setRedirect("/account");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (confirmed) => {
    console.log("confirmed", confirmed);
    if (confirmed){
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/api/user/`,
        headers: { Authorization: `JWT ${token}` },
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("SUCCESS");
            setRedirect("/logout");
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      setShowModal(false);
    }
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      submitUpdate();
   }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return !token ? (
    <Redirect to="/login" />
  ) : (
    <div className="EditAccount">
      <h1>Update your information</h1>
      <TextInput
        isLarge={true}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeypress}
      />
      <TextInput
        isLarge={true}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeypress}
      />
      <div className="EditAccount__pwdLinkContainer">
        Click{" "}
        <Link className="inline-link" to="edit/password">
          here
        </Link>{" "}
        to change your password
      </div>
      <div className="EditAccount__buttonContainer">
        <a className="EditAccount__deleteLink" onClick={() => setShowModal(true)}>
          Delete Account
        </a>
        <Button
          btnText="Update Information"
          onClick={submitUpdate}
          icon={<ArrowRight />}
        />
      </div>
      <DeleteModal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        deleteResponse={handleDelete}
        type="account"
      ></DeleteModal>
    </div>
  );
}

export default EditAccount;
