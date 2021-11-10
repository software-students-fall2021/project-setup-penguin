import pokedex from '../../assets/pokedex.gif';
import team from '../../assets/team.png';
import card from '../../assets/card.png';
import { Button } from '../../common';
import * as Icon from 'react-bootstrap-icons';
import './HowItWorks.css';

const howToSteps = [
  {
    header: 'CREATE',
    subHeader: 'A DECK',
    content:
      'Set up a template card for your team. Decide the qualities you want to share and learn about your teammates!',
    button: {
      text: 'Create a deck',
      link: 'www.google.com',
    },
  },
  {
    header: 'SHARE',
    subHeader: 'YOUR DECK',
    content:
      'Share a link with your teammates so that they can add their own cards to your deck.',
    button: {
      text: '',
      link: '',
    },
  },
  {
    header: 'MEET',
    subHeader: 'THE TEAM',
    content:
      "Look through a deck to find our more about your teammates. You can edit your card, or even edit and delete deck details. Get to know e'm all!",
    button: {
      text: '',
      link: '',
    },
  },
];
// TODO: arrange horizontally ?
function HowItWorks() {
  return (
    <div className="HowItWorks">
      <div className="HowItWorks__title">
        <h1>How it works</h1>
        <Button
          btnText="Get started"
          linkTo="/getstarted"
          icon={<Icon.ArrowRight />}
        />
      </div>
      <div className="HowItWorks__body">
        {howToSteps.map((item, index) => (
          <div className="HowItWorks__row">
            <h2 className="HowItWorks__rowIndex">{index + 1}</h2>
            <div className="HowItWorks__rowHeaderContainer">
              <h2 className="HowItWorks__rowHeader">{item.header}</h2>
              <h4 className="HowItWorks__rowSubHeader">{item.subHeader}</h4>
            </div>
            <div className="HowItWorks__rowContent">{item.content}</div>
            {item.button?.text && item.button.link && (
              <button className="HowItWorks__rowButton">
                {item.button.text}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
