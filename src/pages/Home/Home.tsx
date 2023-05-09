import React, { useState, useEffect } from "react";
import { Col, Row, message } from "antd";
import { HomeProps, WORDS_DATA_TYPE } from "./Home.interface";
import {
  HomeContainer,
  HomeTitle,
  StyledGameParagraph,
  StyledMatchedKeyParagraph,
  StyledBoard,
} from "./Home.styled";
import { WORDS_DATA, shuffleArray } from "../../utils/constants";

const Home: React.FC<HomeProps> = ({}) => {
  const [words, setWords] = useState<WORDS_DATA_TYPE[]>([]);
  const [matchingKeys, setMatchingKeys] = useState<WORDS_DATA_TYPE[]>([]);
  const [selectedWord, setSelectedWord] = useState<WORDS_DATA_TYPE | null>(
    null
  );
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [shouldShake, setShouldShake] = useState<boolean>(false);

  useEffect(() => {
    const shuffledWords = shuffleArray(WORDS_DATA);
    const shuffledMatchingKeys = shuffleArray([...WORDS_DATA]);
    setWords(shuffledWords);
    setMatchingKeys(shuffledMatchingKeys);
  }, []);

  const handleWordChange = (item: WORDS_DATA_TYPE, isMatching: boolean) => {
    if (matchedIds.includes(item.id)) return;
    if (!selectedWord && !isMatching) {
      setSelectedWord(item);
    } else if (selectedWord && selectedWord.id === item.id) {
      setMatchedIds((prevMatchedIds) => [...prevMatchedIds, item.id]);
      setSelectedWord(null);
    } else {
      setSelectedWord(null);
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 820);
    }
  };

  const resetGame = () => {
    const shuffledWords = shuffleArray(WORDS_DATA);
    const shuffledMatchingKeys = shuffleArray([...WORDS_DATA]);
    setWords(shuffledWords);
    setMatchingKeys(shuffledMatchingKeys);
    setSelectedWord(null);
    setMatchedIds([]);
  };

  useEffect(() => {
    if (matchedIds.length === WORDS_DATA.length) {
      message.success("Congratulations! You've matched all the words!");
      resetGame();
    }
  }, [matchedIds]);
  return (
    <HomeContainer>
      <HomeTitle>Words Matching Game</HomeTitle>

      <StyledBoard shouldShake={shouldShake}>
        <Row>
          <Col span={12}>
            {words.map((item) => (
              <StyledGameParagraph
                key={item.id}
                onClick={() => handleWordChange(item, false)}
                isMatched={matchedIds.includes(item.id)}
                isSelected={selectedWord?.id === item.id}
              >
                {item.text}
              </StyledGameParagraph>
            ))}
          </Col>
          <Col span={12}>
            {matchingKeys.map((item) => (
              <StyledMatchedKeyParagraph
                key={item.id}
                onClick={() => handleWordChange(item, true)}
                isMatched={matchedIds.includes(item.id)}
              >
                {item["matching-key"]}
              </StyledMatchedKeyParagraph>
            ))}
          </Col>
        </Row>
      </StyledBoard>
    </HomeContainer>
  );
};

export default Home;
