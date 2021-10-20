
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home, Login, Signup } from "./views";
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Signup");

  const basePage = () => {
    switch (page) {
      case "Login":
        return <Login goToSignup={() => setPage("Signup")} />;
      case "Signup":
        return <Signup goToLogin={() => setPage("Login")} />;
    }
  };
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
      </Switch>
    </Router>

  );
}

export default App;
