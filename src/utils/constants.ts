import { Word } from "../pages/Home/Home.interface";

export const WORDS: Word[] = [
  { id: "1", text: "Sun", matchingKey: "shine" },
  { id: "2", text: "Tree", matchingKey: "leaf" },
  { id: "3", text: "Book", matchingKey: "read" },
  { id: "4", text: "Car", matchingKey: "drive" },
  { id: "5", text: "Phone", matchingKey: "call" },
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
