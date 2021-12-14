import { CardEditor, useViewport, ErrorMessage } from "../common";
import "./CreateBody.css";

function CreateBody({
  btn,
  cardEditorProps,
  prompt,
  header,
  errors,
  setErrors,
}) {
  const { width } = useViewport();
  const isMobile = width < 1000;

  return (
    <div className="CreateBody">
      <h1>{header}</h1>
      <div className={`CreateBody__${isMobile ? "mobile" : "desktop"}`}>
        {isMobile && prompt}
        <div className={isMobile ? "CreateBody__cardContainer" : "col"}>
          <CardEditor {...cardEditorProps} setErrors={setErrors} />
        </div>
        {isMobile ? (
          <div className="CreateBody__mobileBtnContainer">
            <ErrorMessage errors={errors} className="mt-3" />
            {btn}
          </div>
        ) : (
          <div className="col">
            {prompt}
            {<ErrorMessage errors={errors} className="mt-3" />}
            <div className="CreateBody__desktopBtnContainer">{btn}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBody;
