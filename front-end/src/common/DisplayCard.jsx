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
    <div className="DisplayCard">
      <div className="CardEditor__form" id="myCard">
        <div className="CardEditor__upperContent">
          <div className="CardEditor__tagline">{displayArray.tagline}</div>
          <div className="CardEditor__header">
            <div className="CardEditor__name">{displayArray.name}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="CardEditor__city">{displayArray.city}</div>
              <HeartIcon />
            </div>
          </div>
          <img className="CardEditor__image" src={piplup} />
        </div>
        <div className="CardEditor__summary">{displayArray.summary}</div>
        {sectionIds.map((id) => (
          <div className="CardEditor__section">
            <HeartIcon />
            <div className="CardEditor__sectionContent">
              <div className="CardEditor__label">
                {displayArray[`sectionLabel${id}`]}
              </div>
              <div className="CardEditor__textarea">
                {displayArray[`sectionContent${id}`]}
              </div>
            </div>
          </div>
        ))}
        <div class="slider-group">
          <div class="slider-labels">
            <div className="CardEditor__label">
              {displayArray.sliderLabelMin}
            </div>
            <div className="CardEditor__label__right">
              {displayArray.sliderLabelMax}
            </div>
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
