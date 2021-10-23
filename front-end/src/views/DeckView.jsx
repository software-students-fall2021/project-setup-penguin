import { useParams, Link } from "react-router-dom";

function DeckView() {
  let { id } = useParams();
  console.log({ id });

  return (
    <div>
      {" "}
      <h1>this is a deck with id={id}</h1>
      <Link
        to={{
          pathname: `${id}/add`,
          state: { deckId: id }, // passing template data over to the next page
        }}
      >
        Add a card
      </Link>
    </div>
  );
}
export default DeckView;
