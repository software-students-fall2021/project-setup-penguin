import "./card-editor/CardEditor.css";
import "./DisplayCard.css";
import heart from "../assets/heart.png";
import piplup from "../assets/piplup.png";
import Slider from "rc-slider";

//DisplayCard accepts an array of values as input and displays the card accordingly
function DisplayCard(props) {
  const sectionIds = [0, 1, 2];
  const HeartIcon = () => <img src={heart} width="25px" height="25px" />;
  const displayArray = props.tempArray;

  return (
    <div className="CardEditor">
      <div className="CardEditor__form" id="myCard">
        <div className="CardEditor__upperContent">
          <input
            className="CardEditor__tagline"
            type="text"
            name="tagline"
            value={displayArray.tagline}
          />
          <div className="CardEditor__header">
            <input
              type="text"
              className="CardEditor__name"
              name="name"
              value={displayArray.name}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="CardEditor__city"
                type="text"
                name="city"
                value={displayArray.city}
                size="5"
              />
              <HeartIcon />
            </div>
          </div>
          <img className="CardEditor__image" src={piplup} />
        </div>
        <input
          className="CardEditor__summary"
          type="text"
          name="summary"
          value={displayArray.summary}
        />
        {sectionIds.map((id) => (
          <div className="CardEditor__section">
            <HeartIcon />
            <div className="CardEditor__sectionContent">
              <input
                type="text"
                className="CardEditor__label"
                name={`sectionLabel${id}`}
                value={displayArray[`sectionLabel${id}`]}
              />
              <textarea
                rows="2"
                name={`sectionContent${id}`}
                value={displayArray[`sectionContent${id}`]}
              />
            </div>
          </div>
        ))}
        <div class="slider-labels">
        <input
          type="text"
          className="CardEditor__label"
          name="min-slider"
          value={displayArray.sliderLabelMin}
        />
        <input
          type="text"
          className="CardEditor__label"
          name="max-slider"
          value={displayArray.sliderLabelMax}
          style={{ textAlign: "right" }}
        />
        </div>
        <Slider
          value = {displayArray.sliderValue}
          handleStyle={{ borderColor: "pink" }}
          railStyle={{ backgroundColor: "pink" }}
          trackStyle={{ backgroundColor: "pink" }}
        />
      </div>
    </div>
  );
}

export default DisplayCard;
