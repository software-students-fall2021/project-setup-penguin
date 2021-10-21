import { useParams, NavLink } from "react-router-dom";

function DeckView() {
  let { id } = useParams();
  console.log({ id });

  return (
    <div>
      {" "}
      <h1>this is a deck with id={id}</h1>{" "}
      <NavLink to={`${id}/add`}>Add Card</NavLink>
    </div>
  );
}
export default DeckView;
