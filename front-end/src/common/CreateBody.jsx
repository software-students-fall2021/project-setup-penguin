import { CardEditor, useViewport } from "../common";
import "./CreateBody.css";

function CreateBody({ btn, cardEditorProps, prompt, header }) {
  const { width } = useViewport();
  const isMobile = width < 1000;

  return (
    <div className="CreateBody">
      <h1>{header}</h1>
      <div className={`CreateBody__${isMobile ? "mobile" : "desktop"}`}>
        {isMobile && prompt}
        <div className={isMobile ? "CreateBody__cardContainer" : "col"}>
          <CardEditor {...cardEditorProps} />
        </div>
        {isMobile ? (
          <div className="CreateBody__btnContainer">{btn}</div>
        ) : (
          <div className="col">
            {prompt}
            {btn}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBody;
