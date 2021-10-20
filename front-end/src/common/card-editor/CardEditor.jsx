import { useState } from "react";
import "./CardEditor.css";
import kev from "../../assets/kev.jpeg";

const defaultTemplate = {
  namePlaceholder: "name",
  taglinePlaceholder: "~5 word tagline about yourself",
  summaryPlaceholder: "ROLE (# YOE), working hours & time zone",
  sectionLabelA: "Strengths",
  sectionLabelB: "Weaknesses",
  sectionLabelC: "Communication Preferences",
  sectionPlaceholderA: "What do you excel at?",
  sectionPlaceholderB: "What do you struggle with?",
  sectionPlaceholderC: "How do you want people to contact you?",
};

function CardEditor({ onSave }) {
  const [namePlaceholder, setNamePlaceholder] = useState();
  const [taglinePlaceholder, setTaglinePlaceholder] = useState();
  const [summaryPlaceholder, setSummaryPlaceholder] = useState();

  const [sectionLabelA, setSectionLabelA] = useState();
  const [sectionLabelB, setSectionLabelB] = useState();
  const [sectionLabelC, setSectionLabelC] = useState();

  const [sectionPlaceholderA, setSectionPlaceholderA] = useState();
  const [sectionPlaceholderB, setSectionPlaceholderB] = useState();
  const [sectionPlaceholderC, setSectionPlaceholderC] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      namePlaceholder,
      taglinePlaceholder,
      summaryPlaceholder,
      sectionLabelA,
      sectionLabelB,
      sectionLabelC,
      sectionPlaceholderA,
      sectionPlaceholderB,
      sectionPlaceholderC,
    };
    console.log(data);
    onSave?.(data);
  };

  return (
    <div className="CardEditor">
      <form className="CardEditor-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="tagline-placeholder"
          placeholder={defaultTemplate.taglinePlaceholder}
          value={taglinePlaceholder}
          onChange={(event) => {
            setTaglinePlaceholder(event.target.value);
          }}
        />
        <div className="CardEditor-header">
          <input
            type="text"
            name="name-placeholder"
            placeholder={defaultTemplate.namePlaceholder}
            value={namePlaceholder}
            onChange={(event) => {
              setNamePlaceholder(event.target.value);
            }}
          />
          <input type="text" name="city-placeholder" placeholder="NYC" />
        </div>
        {/* TODO: implement file upload & photo repositioning */}
        <div className="CardEditor-image">
          <label htmlFor="file-input">
            <img src={kev} width="100%" />
          </label>
          <input id="file-input" type="file" />
        </div>
        <input
          className="CardEditor-summary"
          type="text"
          name="summary"
          placeholder={defaultTemplate.summaryPlaceholder}
          value={summaryPlaceholder}
          onChange={(event) => {
            setSummaryPlaceholder(event.target.value);
          }}
        />
        {/* can maybe use a loop here */}
        <div className="CardEditor-section">
          <input
            type="text"
            name="sectionA-label"
            placeholder={defaultTemplate.sectionLabelA}
            value={sectionLabelA}
            onChange={(event) => {
              setSectionLabelA(event.target.value);
            }}
          />
          <textarea
            rows="3"
            name="sectionA-placeholder"
            placeholder={defaultTemplate.sectionPlaceholderA}
            value={sectionPlaceholderA}
            onChange={(event) => {
              setSectionPlaceholderA(event.target.value);
            }}
          />
        </div>
        <div className="CardEditor-section">
          <input
            type="text"
            name="sectionB-label"
            placeholder={defaultTemplate.sectionLabelB}
            value={sectionLabelB}
            onChange={(event) => {
              setSectionLabelB(event.target.value);
            }}
          />
          <textarea
            rows="3"
            name="sectionB-placeholder"
            placeholder={defaultTemplate.sectionPlaceholderB}
            value={sectionPlaceholderB}
            onChange={(event) => {
              setSectionPlaceholderB(event.target.value);
            }}
          />
        </div>
        <div className="CardEditor-section">
          <input
            type="text"
            name="sectionC-label"
            placeholder={defaultTemplate.sectionLabelC}
            value={sectionLabelC}
            onChange={(event) => {
              setSectionLabelC(event.target.value);
            }}
          />
          <textarea
            rows="3"
            name="sectionC-placeholder"
            placeholder={defaultTemplate.sectionPlaceholderC}
            value={sectionPlaceholderC}
            onChange={(event) => {
              setSectionPlaceholderC(event.target.value);
            }}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default CardEditor;
