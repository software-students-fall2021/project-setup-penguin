import "./CardEditor.css";
import piplupUpload from "../../assets/piplup-upload.png";
import heart from "../../assets/heart.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FORM_DEFAULT_PLACEHOLDERS,
  TEMPLATE_STEPS,
  REGULAR_STEPS,
} from "../constants";
import { useState, useRef, useEffect } from "react";
import { maybeRenderImage, ImageUploaderModal } from "./ImageUploaderModal";
import Joyride from "react-joyride";

const sectionIds = [0, 1, 2];

const HeartIcon = () => <img src={heart} width="25px" height="25px" />;

function CardEditor({
  form = {},
  setForm,
  templateData,
  shouldRunTour = false,
  setErrors,
}) {
  const [showModal, setShowModal] = useState(false);
  const [finalCrop, setFinalCrop] = useState();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const isPopulatingTemplate = templateData !== undefined;
  const initialImg = (
    <img
      className="CardEditor__image"
      src={
        form.filename
          ? `${process.env.REACT_APP_API_URL}/uploads/${form.filename}`
          : piplupUpload
      }
      onClick={() => setShowModal(true)}
    />
  );

  useEffect(() => {
    // TODO: if current user is new, setShouldRunTour(true)
    maybeRenderImage(finalCrop, imgRef, previewCanvasRef, setForm);
  }, [finalCrop]);

  const getPlaceholderText = (field) =>
    isPopulatingTemplate
      ? templateData[field]
      : FORM_DEFAULT_PLACEHOLDERS[field];

  return (
    <span className="CardEditor">
      <form className="CardEditor__form" id="myCard">
        <div className="CardEditor__upperContent">
          <input
            className="CardEditor__tagline"
            type="text"
            name="tagline"
            placeholder={getPlaceholderText("tagline")}
            value={form.tagline}
            onChange={(event) => {
              setForm((prevState) => ({
                ...prevState,
                tagline: event.target.value,
              }));
            }}
          />
          <div className="CardEditor__header">
            <input
              type="text"
              className="CardEditor__name"
              name="name"
              placeholder={getPlaceholderText("name")}
              value={form.name}
              onChange={(event) => {
                setForm((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
                setErrors?.([]);
              }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="CardEditor__city"
                type="text"
                name="city"
                placeholder={getPlaceholderText("city")}
                value={form.city}
                onChange={(event) => {
                  setForm((prevState) => ({
                    ...prevState,
                    city: event.target.value,
                  }));
                }}
                size="5"
              />
              <HeartIcon />
            </div>
          </div>
          {finalCrop && imgRef.current ? (
            <canvas
              ref={previewCanvasRef}
              onClick={() => setShowModal(true)}
              className="CardEditor__image"
            />
          ) : (
            initialImg
          )}
        </div>
        <input
          className="CardEditor__summary"
          type="text"
          name="summary"
          placeholder={getPlaceholderText("summary")}
          value={form.summary}
          onChange={(event) => {
            setForm((prevState) => ({
              ...prevState,
              summary: event.target.value,
            }));
          }}
        />
        {sectionIds.map((id) => (
          <div className="CardEditor__section">
            <HeartIcon />
            <div className="CardEditor__sectionContent">
              {isPopulatingTemplate ? (
                <div className="CardEditor__label">
                  {templateData[`sectionLabel${id}`]}
                </div>
              ) : (
                <input
                  type="text"
                  className="CardEditor__label"
                  id={`sectionLabel${id}`}
                  name={`sectionLabel${id}`}
                  placeholder={getPlaceholderText(`sectionLabel${id}`)}
                  value={form[`sectionLabel${id}`]}
                  onChange={(event) => {
                    setForm((prevState) => ({
                      ...prevState,
                      [`sectionLabel${id}`]: event.target.value,
                    }));
                  }}
                />
              )}
              <textarea
                className="CardEditor__textarea"
                rows="2"
                id={`sectionContent${id}`}
                name={`sectionContent${id}`}
                placeholder={getPlaceholderText(`sectionContent${id}`)}
                value={form[`sectionContent${id}`]}
                onChange={(event) => {
                  setForm((prevState) => ({
                    ...prevState,
                    [`sectionContent${id}`]: event.target.value,
                  }));
                }}
              />
            </div>
          </div>
        ))}
        <div className="CardEditor__sliderContainer">
          <div className="CardEditor__sliderLabelContainer">
            {isPopulatingTemplate ? (
              <>
                <div className="CardEditor__label">
                  {templateData.sliderLabelMin}
                </div>
                <div
                  className="CardEditor__label"
                  style={{ textAlign: "right" }}
                >
                  {templateData.sliderLabelMax}
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="CardEditor__label"
                  id="min-slider"
                  name="min-slider"
                  placeholder={getPlaceholderText("sliderLabelMin")}
                  value={form.sliderLabelMin}
                  onChange={(event) => {
                    setForm((prevState) => ({
                      ...prevState,
                      sliderLabelMin: event.target.value,
                    }));
                  }}
                />
                <input
                  type="text"
                  className="CardEditor__label"
                  name="max-slider"
                  placeholder={getPlaceholderText("sliderLabelMax")}
                  value={form.sliderLabelMax}
                  onChange={(event) => {
                    setForm((prevState) => ({
                      ...prevState,
                      sliderLabelMax: event.target.value,
                    }));
                  }}
                  style={{ textAlign: "right" }}
                />
              </>
            )}
          </div>
          <Slider
            defaultValue={
              form.sliderValue ?? FORM_DEFAULT_PLACEHOLDERS.sliderValue
            }
            handleStyle={{ borderColor: "pink" }}
            railStyle={{ backgroundColor: "pink" }}
            trackStyle={{ backgroundColor: "pink" }}
            onChange={(value) => {
              setForm((prevState) => ({
                ...prevState,
                sliderValue: value,
              }));
            }}
          />
        </div>
      </form>
      <ImageUploaderModal
        imgRef={imgRef}
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        setFinalCrop={setFinalCrop}
      />
      <Joyride
        // run={false} don't run if user has created template card / regular card before
        steps={isPopulatingTemplate ? REGULAR_STEPS : TEMPLATE_STEPS}
        run={shouldRunTour}
        showProgress={true}
        continuous={true}
        showSkipButton={true}
        spotlightClicks={true}
        styles={{
          options: {
            primaryColor: "#396bba",
          },
          buttonClose: {
            display: "none",
          },
          // if we want a close button that ends tour: https://github.com/gilbarbara/react-joyride/issues/357
        }}
      />
    </span>
  );
}

export default CardEditor;
