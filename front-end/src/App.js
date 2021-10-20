import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import { Home, Login, Signup, CreateDeck, FinishDeckSetup } from "./views";

function App() {
  return (
    <Router>
      {/* abstract this out later when setting up common page nav */}
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>
      </div>

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
      </Switch>
    </Router>
  );
}

export default App;
