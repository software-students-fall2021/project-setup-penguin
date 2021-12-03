import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextInput, Button } from "../../common";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import "./editAccount.css";

function EditAccount({ token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState("");

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

  const handleDelete = () => {
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
<<<<<<< HEAD
        onKeyPress={handleKeypress}
=======
>>>>>>> 6b68f750457831fa23eaead440fbfbaf90565bc0
      />
      <TextInput
        isLarge={true}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
        onKeyPress={handleKeypress}
=======
>>>>>>> 6b68f750457831fa23eaead440fbfbaf90565bc0
      />
      <div className="EditAccount__pwdLinkContainer">
        Click{" "}
        <Link className="inline-link" to="edit/password">
          here
        </Link>{" "}
        to change your password
      </div>
      <div className="EditAccount__buttonContainer">
        <a className="EditAccount__deleteLink" onClick={handleDelete}>
          Delete Account
        </a>
        <Button
          btnText="Update Information"
          onClick={submitUpdate}
          icon={<ArrowRight />}
        />
      </div>
    </div>
  );
}

export default EditAccount;
