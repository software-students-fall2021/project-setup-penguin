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
      <div className="CardDisplay__form" id="myCard">
        <div className="CardDisplay__upperContent">
          <div className="CardDisplay__tagline">{displayArray.tagline}</div>
          <div className="CardDisplay__header">
            <div className="CardDisplay__name">{displayArray.name}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="CardDisplay__city">{displayArray.city}</div>
              <HeartIcon />
            </div>
          </div>
          <img className="CardDisplay__image" src={piplup} />
        </div>
        <div className="CardDisplay__summary">{displayArray.summary}</div>
        {sectionIds.map((id) => (
          <div className="CardDisplay__section">
            <HeartIcon />
            <div className="CardDisplay__sectionContent">
              <div className="CardDisplay__label">
                {displayArray[`sectionLabel${id}`]}
              </div>
              <div className="CardDisplay__textarea">
                {displayArray[`sectionContent${id}`]}
              </div>
            </div>
          </div>
        ))}
        <div class="slider-group">
          <div class="slider-labels">
            <div className="CardDisplay__label">
              {displayArray.sliderLabelMin}
            </div>
            <div className="CardDisplay__label__right">
              {displayArray.sliderLabelMax}
            </div>
          </div>
          <Slider
            value={displayArray.sliderValue}
            handleStyle={{ borderColor: "pink" }}
            railStyle={{ backgroundColor: "pink" }}
            trackStyle={{ backgroundColor: "pink" }}
            disabled='true'
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
