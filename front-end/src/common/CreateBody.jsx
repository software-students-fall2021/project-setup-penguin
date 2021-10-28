import { CardEditor, useViewport } from "../common";
import "./CreateBody.css";

function CreateBody({ btn, cardEditorProps, prompt, header }) {
  const { width } = useViewport();

  const mobile = (
    <div className="CreateBody__mobile">
      {prompt}
      <div></div>
      <CardEditor {...cardEditorProps} isCentered={true} />
      <div className="CreateBody__btnContainer">{btn}</div>
    </div>
  );

  const desktop = (
    <div className="CreateBody__desktop">
      <div className="col">
        <CardEditor {...cardEditorProps} />
      </div>
      <div className="col">
        {prompt}
        {btn}
      </div>
    </div>
  );
  return (
    <div className="CreateBody">
      <h1>{header}</h1>
      {width < 1000 ? mobile : desktop}
    </div>
  );
}

export default CreateBody;
