import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextInput, Button, AccountPromptModal } from "../../common";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import "./editAccount.css";

function EditAccount({ token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  useEffect(() => {
    // Check if token exists otherwise redirect
    if (!token) {
      console.log("Redirecting");
      setRedirect("/login");
    }
    axios({
      method: "get",
      url: `http://localhost:8000/api/user/account`,
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
    if (!name || !email || !password) {
      console.log("All information must be filled out");
      return;
    }
    axios({
      method: "patch",
      url: `http://localhost:8000/api/user/`,
      data: {
        email,
        password,
        name,
      },
      headers: { Authorization: `JWT ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          setRedirect("/createdeck");
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
      url: `http://localhost:8000/api/user/`,
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
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div>
      <form className="EditAccount__form" onSubmit={() => {}}>
        <h1>Update your personal Information</h1>
        <TextInput
          isLarge={true}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          isLarge={true}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          isLarge={true}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div className="EditAccount__buttonSpacer">
        <Button
          btnText="Update Information"
          onClick={submitUpdate}
          icon={<ArrowRight />}
        />
        <Button
          btnText="Delete Account"
          onClick={handleDelete}
          icon={<ArrowRight />}
        />
      </div>
    </div>
  );
}

export default EditAccount;
