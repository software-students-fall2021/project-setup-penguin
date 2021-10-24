import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Navigation from "./common/Navigation";

import {
  Home,
  Login,
  Signup,
  CreateDeck,
  FinishDeckSetup,
  DeckView,
  CreateCard,
} from "./views";

function App() {
  return (
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
          <Route exact path="/deck/:id">
            <DeckView />
          </Route>
          <Route path="/deck/:deckId/add">
            <CreateCard />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
