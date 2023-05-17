import React, { useState, useEffect, useRef } from "react";
import { shuffleArray } from "../../utils/constants";
import { Word } from "./Home.interface";

const WORDS: Word[] = [
  { id: "1", text: "Sun", matchingKey: "shine" },
  { id: "2", text: "Tree", matchingKey: "leaf" },
  { id: "3", text: "Book", matchingKey: "read" },
  { id: "4", text: "Car", matchingKey: "drive" },
  { id: "5", text: "Phone", matchingKey: "call" },
];

const CanvasMatchingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [mixedArr, setMixedArr] = useState<Word[]>([]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const spaceTop = 100; // The top spacing for the words and connections in the canvas
  const wordHeight = 70; // The height/width of each word box
  const wordMargin = 30; // The margin between each word box
  const startWordBox = 25; // The starting position for drawing the word boxes
  const startMatchingBox = 300; // The starting position for drawing the matching key boxes
  const startWordLines = startWordBox + wordHeight;

  useEffect(() => {
    setMixedArr(shuffleArray(WORDS));
    if (canvasContainerRef.current && canvasRef.current) {
      const containerWidth = canvasContainerRef.current.offsetWidth;
      const containerHeight = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = containerWidth;
      canvasRef.current.height = containerHeight;
      canvasRef.current.style.backgroundColor = "lightgray";
    }

    setIsLoaded(true);

    const handleResize = () => {
      if (canvasRef.current && canvasContainerRef.current) {
        const screenWidth = window.innerWidth;
        const containerHeight = canvasContainerRef.current.offsetHeight;
        const containerWidth = Math.min(screenWidth, 450);
        canvasRef.current.width = containerWidth;
        canvasRef.current.style.width = `${containerWidth}px`;
        canvasRef.current.height = containerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawWords(context);
      drawConnections(context);
    }
  }, [connections, isLoaded]);

  const drawWords = (context: CanvasRenderingContext2D) => {
    if (!isLoaded) return;

    const fontSize = 12;

    mixedArr.forEach((word, index) => {
      const y = spaceTop + index * (wordHeight + wordMargin);
      const wordX = startWordBox;
      const matchingKeyX = startMatchingBox;

      context.fillStyle = "black";
      context.fillRect(wordX, y, wordHeight, wordHeight);
      context.fillStyle = "white";
      context.font = `${fontSize}px Arial`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(word.text, wordX + wordHeight / 2, y + wordHeight / 2);
      // canvasRef.current?.querySelector("div")?.style.setProperty("zIndex", "50");

      context.fillStyle = "black";
      context.fillRect(matchingKeyX, y, wordHeight, wordHeight);
      context.fillStyle = "white";
      context.fillText(
        word.matchingKey,
        matchingKeyX + wordHeight / 2,
        y + wordHeight / 2
      );
      // canvasRef.current?.querySelector("div")?.style.setProperty("zIndex", "50");
    });
  };

  const drawConnections = (context: CanvasRenderingContext2D) => {
    const startX = startWordLines;
    const endX = startMatchingBox;
    const lineOffset = -25;

    connections.forEach((connection) => {
      const fromIndex = mixedArr.findIndex(
        (word) => word.id === connection.from
      );
      const toIndex = mixedArr.findIndex((word) => word.id === connection.to);

      if (fromIndex !== -1 && toIndex !== -1) {
        const startY =
          spaceTop +
          fromIndex * (wordHeight + wordMargin) +
          wordHeight / 2 +
          lineOffset;
        const endY =
          spaceTop +
          toIndex * (wordHeight + wordMargin) +
          wordHeight / 2 +
          lineOffset;

        const isMatch =
          mixedArr[fromIndex].matchingKey === mixedArr[toIndex].matchingKey;
        const color = isMatch ? "green" : "orange";

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineWidth = 2;
        context.strokeStyle = color;
        context.stroke();
      }
    });
  };

  const handleCanvasMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const offsetX = event.clientX - (rect?.left || 0);
    const offsetY = event.clientY - (rect?.top || 0);

    const wordIndex = Math.floor(
      (offsetY - spaceTop) / (wordHeight + wordMargin)
    );

    setIsDrawing(true);
    setStartX(offsetX);
    setStartY(offsetY - wordIndex);

    if (wordIndex >= 0 && wordIndex < mixedArr.length) {
      const wordId = mixedArr[wordIndex].id;
      setConnections((prevConnections) => [
        ...prevConnections,
        {
          from: wordId,
          to: null,
          startX: offsetX,
          startY: offsetY - wordIndex,
        },
      ]);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    const rect = canvasRef.current?.getBoundingClientRect();
    const offsetX = event.touches[0].clientX - (rect?.left || 0);
    const offsetY = event.touches[0].clientY - (rect?.top || 0);

    const wordIndex = Math.floor(
      (offsetY - spaceTop) / (wordHeight + wordMargin)
    );

    setIsDrawing(true);
    setStartX(offsetX);
    setStartY(offsetY - wordIndex);

    if (wordIndex >= 0 && wordIndex < mixedArr.length) {
      const wordId = mixedArr[wordIndex].id;
      setConnections((prevConnections) => [
        ...prevConnections,
        {
          from: wordId,
          to: null,
          startX: offsetX,
          startY: offsetY - wordIndex,
        },
      ]);
    }
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (isDrawing) {
      const rect = canvasRef.current?.getBoundingClientRect();
      const offsetX = event.clientX - (rect?.left || 0);
      const offsetY = event.clientY - (rect?.top || 0);

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWords(context);
        drawConnections(context);

        const toIndex = Math.floor((offsetY - spaceTop) / 80);
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(offsetX, spaceTop + toIndex * 80 + 60 / 2);
        context.lineWidth = 2;
        context.strokeStyle = "gray";
        context.stroke();
      }
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const rect = canvasRef.current?.getBoundingClientRect();
      const touch = event.touches[0];
      const offsetX = touch.clientX - (rect?.left || 0);
      const offsetY = touch.clientY - (rect?.top || 0);

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWords(context);
        drawConnections(context);

        // const fromIndex = connections.findIndex(
        //   (connection) => connection.to === null && connection.startY === startY
        // );
        const toIndex = Math.floor((offsetY - 50) / 50);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(offsetX, 50 + toIndex * 50 + 12);
        context.lineWidth = 2;
        context.strokeStyle = "gray";
        context.stroke();
      }
    }
  };

  const handleCanvasMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();

    setIsDrawing(false);

    const offsetY = event.clientY - (rect?.top || 0);
    const toIndex = Math.floor(
      (offsetY - spaceTop) / (wordHeight + wordMargin)
    );

    const fromIndex = connections.findIndex(
      (connection) => connection.to === null && connection.startY === startY
    );

    if (fromIndex !== -1 && toIndex >= 0 && toIndex < mixedArr.length) {
      const wordId = mixedArr[toIndex].id;
      setConnections((prevConnections) => {
        const updatedConnections = [...prevConnections];
        updatedConnections[fromIndex].to = wordId;
        return updatedConnections;
      });
    } else {
      // setConnections((prevConnections) => {
      //   const updatedConnections = [...prevConnections];
      //   updatedConnections.splice(fromIndex, 1);
      //   return updatedConnections;
      // });
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();

    setIsDrawing(false);

    const touch = event.changedTouches[0];
    const offsetY = touch.clientY - (rect?.top || 0);
    const toIndex = Math.floor(
      (offsetY - spaceTop) / (wordHeight + wordMargin)
    );

    const fromIndex = connections.findIndex(
      (connection) => connection.to === null && connection.startY === startY
    );

    if (fromIndex !== -1 && toIndex >= 0 && toIndex < mixedArr.length) {
      const wordId = mixedArr[toIndex].id;
      setConnections((prevConnections) => {
        const updatedConnections = [...prevConnections];
        updatedConnections[fromIndex].to = wordId;
        return updatedConnections;
      });
    } else {
      // setConnections((prevConnections) => {
      //   const updatedConnections = [...prevConnections];
      //   updatedConnections.splice(fromIndex, 1);
      //   return updatedConnections;
      // });
    }
  };

  const handleCanvasMouseLeave = () => {
    setIsDrawing(false);
  };

  const handleTouchCancel = () => {
    setIsDrawing(false);
  };

  return (
    <div
      ref={canvasContainerRef}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        maxWidth: "100%",
        height: "100vh",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid gray",
          cursor: "crosshair",
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      />
    </div>
  );
};

export default CanvasMatchingGame;
