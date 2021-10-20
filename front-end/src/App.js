import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Login, Signup } from "./views";

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
    <div className="App">
      <div>Pokemon Header</div>
      {basePage()}
    </div>
  );
}

export default App;
