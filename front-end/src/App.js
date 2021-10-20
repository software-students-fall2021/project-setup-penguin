import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Login, Signup } from "./Components";

function App() {
  const [page, setPage] = useState("Login");
  return (
    <div className="App">
      You are on : {page} page
      {page === "Login" ? (
        <div>
          <Login goToSignup={() => setPage("Signup")} />
        </div>
      ) : (
        <div>
          <Signup />
        </div>
      )}
    </div>
  );
}

export default App;
