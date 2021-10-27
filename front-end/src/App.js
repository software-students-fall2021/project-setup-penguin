import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Navigation, ViewportProvider } from "./common";

import {
  Home,
  Login,
  Signup,
  CreateDeck,
  FinishDeckSetup,
  DeckView,
  CreateCard,
  AccountPage,
  UpdateDeck,
} from "./views";

function App() { 
  return (
    <ViewportProvider>
      <Router>
        <Navigation />
        <Container className="mt-4">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/createdeck">
              <CreateDeck />
            </Route>
            <Route path="/finishdeck">
              <FinishDeckSetup />
            </Route>
            <Route path="/deck/:deckId/edit">
              <UpdateDeck />
            </Route>
            <Route exact path="/deck/:id">
              <DeckView />
            </Route>
            <Route path="/deck/:deckId/add">
              <CreateCard />
            </Route>
            <Route path="/accountpage">
              <AccountPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ViewportProvider>
  );
}

export default App;
