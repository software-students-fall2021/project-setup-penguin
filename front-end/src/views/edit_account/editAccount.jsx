import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./editAccount.css";

function EditAccount({ token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const submitUpdate = () => {
    axios({
      method: "patch",
      url: `http://localhost:8000/user/${"619449fbb75a9ff22c9211cd"}`,
      data: {
        email,
        password,
        name,
      },
      headers: { Authorization: `JWT ${token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("SUCCESS");
          setRedirect(true);
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
      url: `http://localhost:8000/user/${"619449fbb75a9ff22c9211cd"}`,
      headers: { Authorization: `JWT ${token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("SUCCESS");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (redirect) {
    return <Redirect path="/createdeck" />;
  }
  return (
    <div>
      <input
        placeHolder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeHolder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeHolder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={submitUpdate}>UPDATE!</button>
      <button onClick={handleDelete}>DELETE MY ACCOUNT</button>
    </div>
  );
}

export default EditAccount;
