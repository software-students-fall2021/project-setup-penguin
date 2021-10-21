import { NavLink } from "react-router-dom";
import { CardEditor } from "../../common";

function CreateCard() {
  return (
    <div>
      <h1>Create Your Card</h1>
      <p>Fill it in!</p>
      <CardEditor />
      {/* TODO: style the NavLink to look like a button */}
      <NavLink to="/finishdeck">Continue</NavLink>
    </div>
  );
}

export default CreateCard;
