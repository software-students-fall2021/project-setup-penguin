import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Login, Signup } from "./Components";

function App() {
  const [page, setPage] = useState("Signup");

  return (
    <div className="App">
      {page ===
        "Login" && (
          <div>
            <Login goToSignup={() => setPage("Signup")} />
          </div>
        )}

      {page ===
        "Signup" && (
          <div>
            <Signup goToLogin={() => setPage("Login")} />
          </div>
        )}
    </div>
  );
}

export default App;
