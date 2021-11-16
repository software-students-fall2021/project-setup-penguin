const { useEffect } = require("react");
const { Redirect } = require("react-router-dom");

export default function Logout({ setToken }) {
  useEffect(() => {
    localStorage.removeItem("token");
    setToken(undefined);
  }, []);

  return <Redirect to="/" />;
}
