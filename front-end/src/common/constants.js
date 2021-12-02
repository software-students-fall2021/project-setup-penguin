export const MODAL_PAGE_TYPE = { SIGNUP: "Sign up", LOGIN: "Log in" };

export const PARENT_TYPE = { DECK: "deck", CARD: "card" };

export const FORM_DEFAULT_PLACEHOLDERS = {
  name: "Name Here*",
  city: "NYC",
  tagline: "~5 word tagline about yourself",
  summary: "ROLE (# YOE), working hours & time zone",
  sectionLabel0: "Strengths",
  sectionLabel1: "Weaknesses",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "What do you excel at?",
  sectionContent1: "What do you struggle with?",
  sectionContent2: "How do you want people to contact you?",
  sliderLabelMin: "Introvert",
  sliderLabelMax: "Extrovert",
  sliderValue: 50,
};

export const EMPTY_TEMPLATE = {
  name: "",
  city: "",
  tagline: "",
  summary: "",
  sectionLabel0: "",
  sectionLabel1: "",
  sectionLabel2: "",
  sectionContent0: "",
  sectionContent1: "",
  sectionContent2: "",
  sliderLabelMin: "",
  sliderLabelMax: "",
  sliderValue: 50,
  filename: "",
};

export const EMPTY_CARD = {
  name: "",
  city: "",
  tagline: "",
  summary: "",
  sectionContent0: "",
  sectionContent1: "",
  sectionContent2: "",
  sliderValue: 50,
  filename: "",
};

export const TEST_TEMPLATE_DATA = {
  name: "Janet Huang",
  city: "NYC",
  tagline: "K-drama and dessert enthusiast",
  summary: "Software Engineer (2 YOE), 9AM-5PM ",
  sectionLabel0: "Superpowers",
  sectionLabel1: "Things you suck at",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "eating & sleeping",
  sectionContent1: "speaking",
  sectionContent2: "never ideally",
  sliderLabelMin: "me",
  sliderLabelMax: "we",
};

const TempOne = {
  name: "Bob Ross",
  city: "NYC",
  tagline: "I love to paint, and laugh.",
  summary: "Designer (0 YOE), 9AM-5PM EST",
  sectionLabel0: "Strengths",
  sectionLabel1: "Weaknesses",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "Making happy mistakes",
  sectionContent1: "Nothing",
  sectionContent2: "bobross@happymistakes.com",
  sliderLabelMin: "Introvert",
  sliderLabelMax: "Extrovert",
  sliderValue: 80,
};

const TempTwo = {
  name: "Pikachu",
  city: "NYC",
  tagline: "Pika!!!!",
  summary: "Pokemon(6 YOE), 10AM-11PM EST",
  sectionLabel0: "Strengths",
  sectionLabel1: "Weaknesses",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "Pika Pika",
  sectionContent1: "Chu",
  sectionContent2: "pika@chu.com",
  sliderLabelMin: "Introvert",
  sliderLabelMax: "Extrovert",
  sliderValue: 20,
};

const TempThree = {
  name: "Ariana Grande",
  city: "NYC",
  tagline: "*whistle singing*",
  summary: "Singer and Artist (5 YOE), 6AM-11PM EST",
  sectionLabel0: "Strengths",
  sectionLabel1: "Weaknesses",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "Singing",
  sectionContent1: "Walking in sneakers",
  sectionContent2: "arianatalent@gmail.com",
  sliderLabelMin: "Introvert",
  sliderLabelMax: "Extrovert",
  sliderValue: 95,
};

const TempFour = {
  name: "Andrew Hamilton",
  city: "NYC",
  tagline: "Billionaire, President of NYU",
  summary: "Money-maker (1 YOE), 24/7",
  sectionLabel0: "Strengths",
  sectionLabel1: "Weaknesses",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "I make money",
  sectionContent1: "I can't not make money",
  sectionContent2: "andyfanmail@gmail.com",
  sliderLabelMin: "Introvert",
  sliderLabelMax: "Extrovert",
  sliderValue: 50,
};

const TempFive = {
  name: "Jane Doe",
  city: "Unknown",
  tagline: "You don't know me",
  summary: "Missing (2 YOE), 9AM-5PM EST",
  sectionLabel0: "Strengths",
  sectionLabel1: "Weaknesses",
  sectionLabel2: "Communication Preferences",
  sectionContent0: "I can disappear",
  sectionContent1: "You'll never get to know me",
  sectionContent2: "?",
  sliderLabelMin: "Introvert",
  sliderLabelMax: "Extrovert",
  sliderValue: 10,
};

export const TEST_CARDS_ARRAY = [
  TempOne,
  TempTwo,
  TempThree,
  TempFour,
  TempFive,
];

export const TEMPLATE_STEPS = [
  {
    target: ".CardEditor__form",
    content: "Let's create your card together!",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__tagline",
    content: "We recommend writing a highlight about yourself here...",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__name",
    content: "your name here...",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__city",
    content:
      "and some short yet meaningful abbreviation here (e.g. office / home location).",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__image",
    content:
      "Next, upload a photo so that your teammates can match your face to your info.",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__summary",
    content:
      "Whether you find titles and/or working hours important, put down the deets here!",
    disableBeacon: true,
  },
  {
    target: "#sectionLabel0",
    content:
      "Only you can edit section headers like this; your teammates will view whatever headers you choose as fixed labels.",
    disableBeacon: true,
  },
  {
    target: "#sectionContent0",
    content:
      "Whatever you put here will be used as placeholder text for your teammates.",
    disableBeacon: true,
  },
  {
    target: "#min-slider",
    content: "The slider labels are also only editable by you.",
    disableBeacon: true,
  },
  {
    target: ".rc-slider-handle",
    content:
      "Drag this dot to reflect wherever you fall on your custom spectrum.",
    disableBeacon: true,
  },
];

export const REGULAR_STEPS = [
  {
    target: ".CardEditor__form",
    content: "Let's create your card together!",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__tagline",
    content: "Replace all the placeholders with info about yourself",
    disableBeacon: true,
  },
  {
    target: ".CardEditor__image",
    content:
      "Upload a photo so that your teammates can match your face to your info.",
    disableBeacon: true,
  },
  {
    target: ".rc-slider-handle",
    content:
      "Drag this dot to reflect wherever you fall on the defined spectrum.",
    disableBeacon: true,
  },
];
