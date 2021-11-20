import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextInput, Button, AccountPromptModal } from '../../common';
import { ArrowRight } from 'react-bootstrap-icons';
import axios from 'axios';
import './editAccount.css';

function EditAccount({ token }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    console.log(token);
    if (!token) {
      console.log('Redirecting');
      setRedirect('/login');
    }
  }, [token]);
  const submitUpdate = () => {
    if (!name || !email || !password) {
      return;
    }
    axios({
      method: 'patch',
      url: `http://localhost:8000/user/}`,
      data: {
        email,
        password,
        name,
      },
      headers: { Authorization: `JWT ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('SUCCESS');
          setRedirect('/createdeck');
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
      method: 'delete',
      url: `http://localhost:8000/user/}`,
      headers: { Authorization: `JWT ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('SUCCESS');
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (redirect) {
    return <Redirect path={redirect} />;
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
          onClick={() => {
            submitUpdate();
          }}
          icon={<ArrowRight />}
        />
        <Button
          btnText="Delete Account"
          onClick={() => {
            handleDelete();
          }}
          icon={<ArrowRight />}
        />
      </div>
    </div>
  );
}

export default EditAccount;
