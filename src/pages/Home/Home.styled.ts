import { Typography } from "antd";
import styled, { keyframes, css } from "styled-components";

interface GameParagraphProps {
  isSelected?: boolean;
  isMatched?: boolean;
}

interface GameBoardProps {
  shouldShake: boolean;
}

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const StyledBoard = styled.div.attrs<GameBoardProps>((props) => ({
  className: props.shouldShake ? "shake" : "",
}))<GameBoardProps>`
  width: 100%;
  &.shake {
    animation: ${css`
      ${shake} 0.5s cubic-bezier(.36,.07,.19,.97) both
    `};
  }
`;

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
