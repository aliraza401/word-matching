import { WORDS_DATA_TYPE } from "../pages/Home/Home.interface";

export const ROUTES = {};

export const WORDS_DATA: WORDS_DATA_TYPE[] = [
  { text: "Sun", "matching-key": "shine", id: 1 },
  { text: "Tree", "matching-key": "leaf", id: 2 },
  { text: "Book", "matching-key": "read", id: 3 },
  { text: "Car", "matching-key": "drive", id: 4 },
  { text: "Phone", "matching-key": "call", id: 5 },
];

export const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};
