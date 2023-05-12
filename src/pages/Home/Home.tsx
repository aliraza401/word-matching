import React, { useState, useRef, useEffect } from "react";
import { message } from "antd";
import { WORDS, shuffleArray } from "../../utils/constants";
import { Container, Line, Word, WordContainer } from "./Home.styled";

const Home: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [mixedArr, _] = useState(shuffleArray(WORDS));
  const refs = useRef<any>({});
  const touchStartRef = useRef<any>(
    null
  );

  const handleDragStart = (
    event: React.DragEvent<HTMLSpanElement>,
    word: string
  ) => {
    event.dataTransfer.setData("text/plain", word);
    setSelectedWord(word);
  };

  const handleDragEnd = () => setSelectedWord(null);

  const handleDragEnter = (
    event: React.DragEvent<HTMLSpanElement>,
    matchingKey: string
  ) => {
    event.preventDefault();
    if (selectedWord) {
      const isMatch =
        WORDS.find((word) => word.text === selectedWord)?.matchingKey ===
        matchingKey;
      const selectedWordText = selectedWord;

      if (
        selectedWordText &&
        !connections.find(
          (connection) =>
            connection.from.current ===
            refs.current[selectedWordText][0].current
        )
      ) {
        setConnections((prev) => [
          ...prev,
          {
            from: refs.current[selectedWordText][0],
            to: refs.current[matchingKey][1],
            isMatch,
          },
        ]);
      }
    }
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLSpanElement>,
    wordId: string
  ) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      id: wordId,
      startX: touch.clientX,
      startY: touch.clientY,
    };
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLSpanElement>) => {
    const touch = event.touches[0];
    const { id, startX, startY } = touchStartRef.current;
    const dragElement = document.getElementById(id);

    if (dragElement) {
      const offsetX = touch.clientX - startX;
      const offsetY = touch.clientY - startY;
      dragElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  };

  const handleTouchEnd = () => {
    const { id } = touchStartRef.current;
    const dragElement = document.getElementById(id);

    if (dragElement) {
      dragElement.style.transform = "";
    }

    touchStartRef.current = null;
  };

  useEffect(() => {
    if (calculateWin()) {
      message.success("You win!");
    } else if (connections.length === WORDS.length) {
      message.error("You lose!");
    }
  }, [connections]);

  const calculateWin = (): boolean => {
    let matchedCount: number = 0;
    connections.forEach((connection) => {
      const text = connection.from.current?.textContent;
      const matchingKey = connection.to.current?.textContent;
      if (matchingKey !== WORDS.find((item) => item.text === text)?.matchingKey)
        return false;

      matchedCount++;
    });

    if (matchedCount !== WORDS.length) return false;

    return true;
  };

  return (
    <Container>
      <WordContainer>
        {mixedArr.map((word) => (
          <div key={word.id} className="word-container">
            <Word
              ref={(el) => {
                if (!refs.current[word.text]) {
                  refs.current[word.text] = [
                    React.createRef(),
                    React.createRef(),
                  ];
                }
                refs.current[word.text][0].current = el;
              }}
              draggable
              onDragStart={(event) => handleDragStart(event, word.text)}
              onDragEnd={handleDragEnd}
              onTouchStart={(event) => handleTouchStart(event, word.id)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              isLineThrough={connections.some(
                (connection) =>
                  connection.from.current?.textContent === word.text
              )}
            >
              {word.text}
            </Word>
          </div>
        ))}
      </WordContainer>
      <WordContainer>
        {WORDS.map((word) => (
          <div key={word.id} className="word-container">
            <Word
              ref={(el) => {
                if (!refs.current[word.matchingKey]) {
                  refs.current[word.matchingKey] = [
                    React.createRef(),
                    React.createRef(),
                  ];
                }
                refs.current[word.matchingKey][1].current = el;
              }}
              onDragEnter={(event) => handleDragEnter(event, word.matchingKey)}
              onDragOver={(event) => event.preventDefault()}
              isLineThrough={connections.some(
                (connection) =>
                  connection.to.current?.textContent === word.matchingKey
              )}
            >
              {word.matchingKey}
            </Word>
          </div>
        ))}
      </WordContainer>
      {connections.map((connection, index) => (
        <Line
          key={index}
          from={connection.from}
          to={connection.to}
          color={connection.isMatch ? "green" : "orange"}
        />
      ))}
    </Container>
  );
};

export default Home;
