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
    <div className="CardEditor DisplayCard">
      <div className="CardEditor__form" id="myCard">
        <div className="CardEditor__upperContent">
          <div className="CardEditor__tagline">
              {displayArray.tagline}
          </div>
          <div className="CardEditor__header">
            <div className="CardEditor__name">
                {displayArray.name}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="CardEditor__city">
              {displayArray.city}
              </div>
              <HeartIcon />
            </div>
          </div>
          <img className="CardEditor__image" src={piplup} />
        </div>
        <div className="CardEditor__summary">
        {displayArray.summary}
        </div>
        {sectionIds.map((id) => (
          <div className="CardEditor__section">
            <HeartIcon />
            <div className="CardEditor__sectionContent">
              <div className="CardEditor__label">
              {displayArray[`sectionLabel${id}`]}
              </div>
              <textarea
                className="CardEditor__textarea"
                rows="2"
                name={`sectionContent${id}`}
                value={displayArray[`sectionContent${id}`]}
              />
            </div>
          </div>
        ))}
        <div class="slider-group">
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
          value={displayArray.sliderValue}
          handleStyle={{ borderColor: "pink" }}
          railStyle={{ backgroundColor: "pink" }}
          trackStyle={{ backgroundColor: "pink" }}
        />
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
