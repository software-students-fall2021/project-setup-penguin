import "./CardEditor.css";
import piplup from "../../assets/piplup.png";
import heart from "../../assets/heart.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FORM_DEFAULT_PLACEHOLDERS } from "../constants";

const sectionIds = [0, 1, 2];

const HeartIcon = () => <img src={heart} width="25px" height="25px" />;

function CardEditor({ form = {}, setForm, templateData }) {
  const isPopulatingTemplate = templateData !== undefined;

  const getPlaceholderText = (field) =>
    isPopulatingTemplate
      ? templateData[field]
      : FORM_DEFAULT_PLACEHOLDERS[field];

  return (
    <div className="CardEditor">
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
          {/* TODO: implement file upload & photo repositioning */}
          {/* <label htmlFor="file-input"> */}
          <img className="CardEditor__image" src={piplup} />
          {/* </label>
        <input id="file-input" type="file" /> */}
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
            defaultValue={FORM_DEFAULT_PLACEHOLDERS.sliderValue}
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
    </div>
  );
}

export default CardEditor;
