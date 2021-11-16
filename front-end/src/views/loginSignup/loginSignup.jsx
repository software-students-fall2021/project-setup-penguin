import { useHistory } from "react-router-dom";
import SignupOrLogin from "../../common/account-prompt-modal/SignupOrLogin";
import axios from "axios";
import { MODAL_PAGE_TYPE } from "../../common/constants";

import "./loginSignup.css";

function LoginSignup({ pageType }) {
  const history = useHistory();
  const handleRedirect = (page) => {
    if (page === MODAL_PAGE_TYPE.LOGIN) {
      history.push("/login");
    } else if (page === MODAL_PAGE_TYPE.SIGNUP) {
      history.push("/signup");
    }
  };

  const onSignupOrLogin = (pageType, name, email, password) => {
    let userId;
    if (pageType === MODAL_PAGE_TYPE.SIGNUP) {
      // TODO: create & save account – get id of newly created account
      axios({
        method: "post",
        url: "http://localhost:8000/user",
        data: {
          username: email,
          password: password,
          name: name,
        },
      })
        .then((res) => {
          if (res.status === 200) history.push("/accountpage");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // log user in – get id of existing account
      axios
        .post("http://localhost:8000/user/login", {
          userId: email,
          password,
        })
        .then((res) => {
          if (res.status === 200) history.push("/accountpage");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="LoginSignup">
      <SignupOrLogin
        pageType={pageType}
        setPageType={handleRedirect}
        onSignupOrLogin={onSignupOrLogin}
        onContinueAsGuest={null}
        useAsPage={true}
      />
    </div>
  );
}

export default LoginSignup;
