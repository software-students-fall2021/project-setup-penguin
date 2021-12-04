import { Redirect } from "react-router-dom";
import { useState } from "react";
import { TextInput, Button, ErrorMessage } from "../../common";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import "./ChangePassword.css";

function ChangePassword({ token }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const [errors, setErrors] = useState([]);

  const onUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrors(["Please fill in all fields."]);
    } else if (newPassword !== confirmPassword) {
      setErrors([
        "Please confirm that your new password matches the confirmation password",
      ]);
    } else {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}/api/user/password`,
        data: {
          currentPassword,
          newPassword,
        },
        headers: { Authorization: `JWT ${token}` },
      })
        .then(() => {
          setRedirect("/account");
        })
        .catch((err) => {
          setErrors(err.response.data.messages);
        });
    }
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onUpdatePassword();
   }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return !token ? (
    <Redirect to="/login" />
  ) : (
    <div className="ChangePassword">
      <h1>Update your password</h1>
      <TextInput
        isLarge={true}
        placeholder="Current password"
        value={currentPassword}
        onChange={(e) => {
          setErrors([]);
          setCurrentPassword(e.target.value);
        }}
        type="password"
        label="Current password"
        onKeyPress={handleKeypress}
      />
      <TextInput
        isLarge={true}
        placeholder="New password"
        value={newPassword}
        onChange={(e) => {
          setErrors([]);
          setNewPassword(e.target.value);
        }}
        type="password"
        label="New password"
        onKeyPress={handleKeypress}
      />
      <TextInput
        isLarge={true}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => {
          setErrors([]);
          setConfirmPassword(e.target.value);
        }}
        type="password"
        label="Confirm new password"
        onKeyPress={handleKeypress}
      />
      <div className="mt-4">
        <ErrorMessage errors={errors} />
      </div>
      <div className="ChangePassword__btnContainer">
        <Button
          btnText="Update Password"
          onClick={onUpdatePassword}
          icon={<ArrowRight />}
        />
      </div>
    </div>
  );
}

export default ChangePassword;
