import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MODAL_PAGE_TYPE } from "./common/constants";
import "./App.css";
import { Navigation, ViewportProvider } from "./common";
import { useState } from "react";
import {
  Home,
  LoginSignup,
  CreateDeck,
  FinishDeckSetup,
  DeckView,
  CreateCard,
  AccountPage,
  UpdateDeck,
  UpdateCard,
  HowItWorks,
  GetStarted,
  FindDeck,
  Logout,
  EditAccountPage,
  ChangePassword,
} from "./views";

function App() {
  const jwtToken = localStorage.getItem("token");
  const [token, setToken] = useState(jwtToken);

  return (
    <ViewportProvider>
      <Router>
        <Navigation token={token} />
        <Container className="customContainer">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/howitworks">
              <HowItWorks />
            </Route>
            <Route exact path="/getstarted">
              <GetStarted />
            </Route>
            <Route path="/login">
              <LoginSignup
                pageType={MODAL_PAGE_TYPE.LOGIN}
                setToken={setToken}
              />
            </Route>
            <Route path="/signup">
              <LoginSignup
                pageType={MODAL_PAGE_TYPE.SIGNUP}
                setToken={setToken}
              />
            </Route>
            <Route path="/logout">
              <Logout setToken={setToken} />
            </Route>
            <Route path="/createdeck">
              <CreateDeck />
            </Route>
            <Route path="/finddeck">
              <FindDeck />
            </Route>
            <Route path="/finishdeck">
              <FinishDeckSetup token={token} setToken={setToken} />
            </Route>
            <Route path="/deck/:deckId/edit">
              <UpdateDeck token={token} />
            </Route>
            <Route exact path="/deck/:id">
              <DeckView token={token} />
            </Route>
            <Route path="/deck/:deckId/add">
              <CreateCard token={token} setToken={setToken} />
            </Route>
            <Route path="/deck/:deckId/card/:cardId/edit">
              <UpdateCard token={token} />
            </Route>
            <Route path="/account/edit/password">
              <ChangePassword token={token} />
            </Route>
            <Route path="/account/edit">
              <EditAccountPage token={token} />
            </Route>
            <Route path="/account">
              <AccountPage token={token} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ViewportProvider>
  );
}

export default App;
