import { CardEditor, useViewport } from "../common";
import "./CreateBody.css";

function CreateBody({ btn, cardEditorProps, prompt }) {
  const { width } = useViewport();

  const mobile = (
    <>
      {prompt}
      <CardEditor {...cardEditorProps} isCentered={true} />
      <div className="CreateBody__btnContainer">{btn}</div>
    </>
  );

  const desktop = (
    <div className="d-flex row">
      <div className="col">
        <CardEditor {...cardEditorProps} />
      </div>
      <div className="col">
        {prompt}
        {btn}
      </div>
    </div>
  );
  return width < 766 ? mobile : desktop;
}

export default CreateBody;
