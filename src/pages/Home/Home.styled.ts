import styled from "styled-components";
import { Typography } from "antd";

interface GameParagraphProps {
  isSelected?: boolean;
  isMatched?: boolean;
}
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const HomeTitle = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #001529;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const StyledGameParagraph = styled(
  Typography.Paragraph
)<GameParagraphProps>`
  color: ${(props) =>
    props.isMatched ? "green" : props.isSelected ? "orange" : "black"};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
`;

export const StyledMatchedKeyParagraph = styled(
  Typography.Paragraph
)<GameParagraphProps>`
  color: ${(props) => (props.isMatched ? "green" : "black")};
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
`;
