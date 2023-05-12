import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const WordContainer = styled.div`
  width: 50%;
`;

interface WordProps {
  isLineThrough: boolean;
}

export const Word = styled.span<WordProps>`
  cursor: ${(props) => (props.draggable ? "move" : "pointer")};
  text-decoration: ${(props) =>
    props.isLineThrough ? "line-through" : "none"};
`;

export const Line = styled.div<{
  from: React.RefObject<HTMLDivElement>;
  to: React.RefObject<HTMLDivElement>;
  color: string;
}>`
  position: absolute;
  width: ${(props) =>
    props.from.current && props.to.current
      ? Math.hypot(
          props.to.current.getBoundingClientRect().left -
            props.from.current.getBoundingClientRect().left,
          props.to.current.getBoundingClientRect().top -
            props.from.current.getBoundingClientRect().top
        )
      : 0}px;
  height: 2px;
  background-color: ${(props) => props.color};
  left: ${(props) =>
    props.from.current
      ? props.from.current.getBoundingClientRect().left -
        (props.from.current.offsetParent
          ? props.from.current.offsetParent.getBoundingClientRect().left
          : 0)
      : 0}px;
  top: ${(props) =>
    props.from.current
      ? props.from.current.getBoundingClientRect().top +
        props.from.current.offsetHeight / 2
      : 0}px;
  transform-origin: left top;
  transform: ${(props) =>
    props.from.current && props.to.current
      ? `rotate(${Math.atan2(
          props.to.current.getBoundingClientRect().top -
            props.from.current.getBoundingClientRect().top,
          props.to.current.getBoundingClientRect().left -
            props.from.current.getBoundingClientRect().left
        )}rad)`
      : "none"};
`;
