import React, { useState, useEffect } from "react";
import "./App.css";

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState([10, 10]);
  const [gameOver, setGameOver] = useState(false);

  const boardSize = 20;

  // Generate random food position
  const getRandomPosition = () => {
    return [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
  };

  // Handle game over
  const handleGameOver = () => {
    setGameOver(true);
    setSnake([[5, 5]]);
    setDirection("RIGHT");
    setFood(getRandomPosition());
  };

  // Move the snake
  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];

    let newHead;
    switch (direction) {
      case "UP":
        newHead = [head[0] - 1, head[1]];
        break;
      case "DOWN":
        newHead = [head[0] + 1, head[1]];
        break;
      case "LEFT":
        newHead = [head[0], head[1] - 1];
        break;
      case "RIGHT":
        newHead = [head[0], head[1] + 1];
        break;
      default:
        return;
    }

    newSnake.push(newHead);
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(getRandomPosition());
    } else {
      newSnake.shift();
    }

    // Check for collision
    if (
      newHead[0] < 0 ||
      newHead[1] < 0 ||
      newHead[0] >= boardSize ||
      newHead[1] >= boardSize ||
      newSnake.slice(0, -1).some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      handleGameOver();
      return;
    }

    setSnake(newSnake);
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  // Handle button input
  const handleButtonClick = (newDirection) => {
    switch (newDirection) {
      case "UP":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "DOWN":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "LEFT":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "RIGHT":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  return (
    <div className="snake-game">
      <h1>Snake Game</h1>
      {gameOver && <div className="game-over">Game Over!</div>}
      <div className="board">
        {Array.from({ length: boardSize }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: boardSize }).map((_, col) => (
              <div
                key={col}
                className={`cell ${
                  snake.some((segment) => segment[0] === row && segment[1] === col)
                    ? "snake"
                    : ""
                } ${food[0] === row && food[1] === col ? "food" : ""}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={() => handleButtonClick("UP")}>UP</button>
        <div className="horizontal-controls">
          <button onClick={() => handleButtonClick("LEFT")}>LEFT</button>
          <button onClick={() => handleButtonClick("RIGHT")}>RIGHT</button>
        </div>
        <button onClick={() => handleButtonClick("DOWN")}>DOWN</button>
      </div>
      <button onClick={() => setGameOver(false)} className="restart-button">
        Restart
      </button>
    </div>
  );
};

export default SnakeGame;
