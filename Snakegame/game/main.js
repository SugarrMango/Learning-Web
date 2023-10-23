let board = document.querySelector(".board");
let pauseMenuElement = document.querySelector(".pause-modal");
let resumeButton = document.querySelector(".resume");

let loseMenuElement = document.querySelector(".lose-modal");
let retryButton = document.querySelector(".retry");
let statsText = document.querySelector(".lose-modal .stats");

function setupScene() {
  // for i in range(400):
  for (let i = 0; i < 400; i += 1) {
    let cell = document.createElement("div");
    cell.className = "cell default";
    board.appendChild(cell);
  }

  resumeButton.addEventListener("click", resumeGame);
  retryButton.addEventListener("click", setup);
}

function changeType(position, ...types) {
  let index = getIndex(position[0], position[1]);
  let cell = board.children.item(index);
  if (!cell) {
    return;
  }
  cell.className = `cell ${types.join(" ")}`;
}

const FRUIT_TYPE = "fruit";
const SNAKE_BODY_TYPE = "snake-body";
const SNAKE_HEAD_TYPE = "snake-head";
const SNAKE_TAIL_TYPE = "snake-tail";
const DEFAULT_TYPE = "default";

let fruit, snake;
let direction = "none";
let moveInterval;
let isGameRunning = false;
let isGamePaused = false;

function applyTurn(cell, direction, type) {
  if (direction === "up") {
    changeType(cell, type, "top-left-rounded", "top-right-rounded");
  } else if (direction === "left") {
    changeType(cell, type, "top-left-rounded", "bottom-left-rounded");
  } else if (direction === "right") {
    changeType(cell, type, "top-right-rounded", "bottom-right-rounded");
  } else if (direction === "down") {
    changeType(cell, type, "bottom-left-rounded", "bottom-right-rounded");
  } else {
    changeType(cell, type);
  }
}

function repaint() {
  for (let r = 0; r < 20; r += 1) {
    for (let c = 0; c < 20; c += 1) {
      changeType([r, c], DEFAULT_TYPE);
    }
  }

  // for i in range(len(snake)):
  for (let i = 1; i < snake.length - 1; i++) {
    let curCell = snake[i];
    let prevCell = snake[i - 1];
    let nextCell = snake[i + 1];

    // i-1     i     i+1
    // prev    ^     next

    let prevDirection = getDirection(curCell, prevCell);
    let nextDirection = getDirection(curCell, nextCell);
    let directions = [prevDirection, nextDirection];

    if (matches(directions, ["up", "right"])) {
      changeType(curCell, SNAKE_BODY_TYPE, "bottom-left-rounded");
    } else if (matches(directions, ["up", "left"])) {
      changeType(curCell, SNAKE_BODY_TYPE, "bottom-right-rounded");
    } else if (matches(directions, ["down", "right"])) {
      changeType(curCell, SNAKE_BODY_TYPE, "top-left-rounded");
    } else if (matches(directions, ["down", "left"])) {
      changeType(curCell, SNAKE_BODY_TYPE, "top-right-rounded");
    } else {
      changeType(curCell, SNAKE_BODY_TYPE);
    }
  }

  // snake-head
  applyTurn(snake[0], direction, SNAKE_HEAD_TYPE);
  // snake-tail
  if (snake.length > 1) {
    let tailDirection = getDirection(
      snake[snake.length - 2],
      snake[snake.length - 1]
    );
    applyTurn(snake[snake.length - 1], tailDirection, SNAKE_TAIL_TYPE);
  }

  changeType(fruit, FRUIT_TYPE);
}

function setup() {
  fruit = generatePosition(); // [r, c]
  snake = [generatePosition()];

  resetPoints();
  repaint();
  resetTimer();
  startTimer();

  moveInterval = setInterval(move, 100);
  direction = "none";
  isGameRunning = true;
  pauseMenuElement.style.display = "none";
  loseMenuElement.style.display = "none";
}

function handleKeyDown(event) {
  const key = event.key;
  console.log("key", key);

  switch (key) {
    case "ArrowLeft": {
      if (direction !== "right") {
        direction = "left";
      }
      break;
    }
    case "ArrowRight": {
      if (direction !== "left") {
        direction = "right";
      }
      break;
    }
    case "ArrowUp": {
      if (direction !== "down") {
        direction = "up";
      }
      break;
    }
    case "ArrowDown": {
      if (direction !== "up") {
        direction = "down";
      }
      break;
    }
    case "Escape": {
      console.log("here");
      if (isGamePaused) {
        resumeGame();
      } else {
        pauseGame();
      }
      break;
    }
    default: {
      break;
    }
  }
}

function pauseGame() {
  if (isGameRunning && !isGamePaused) {
    isGamePaused = true;
    clearInterval(moveInterval);
    stopTimer();
    pauseMenuElement.style.display = "flex";
  }
}

function resumeGame() {
  if (isGameRunning && isGamePaused) {
    isGamePaused = false;
    moveInterval = setInterval(move, 100);
    startTimer();
    pauseMenuElement.style.display = "none";
  }
}

function lose() {
  pauseMenuElement.style.display = "none";
  isGameRunning = false;

  clearInterval(moveInterval);
  stopTimer();
  // You got 5 points in 2 minutes and 10 seconds

  const timer = getTimer();
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  statsText.textContent = `You got ${getPoints()} points in ${minutes} minutes and ${seconds} seconds`;
  loseMenuElement.style.display = "flex";
}

function eatFruit() {
  fruit = generatePosition();
  increasePoints(1);

  while (snake.some((x) => arePositionsEqual(x, fruit))) {
    fruit = generatePosition();
  }
}

function move() {
  if (direction === "none") {
    return;
  }

  let newPosition = getNewPosition(snake[0], direction);
  let [r, c] = newPosition;

  if (r < 0 || c < 0 || r > 19 || c > 19) {
    lose();
    return;
  }

  if (arePositionsEqual(newPosition, fruit)) {
    eatFruit();
  } else {
    // Before: snake = [ [3, 4], [4, 5], [2, 6], [7, 8] ]
    // After: snake = [ [3, 4], [4, 5], [2, 6] ]
    snake.pop();
  }

  if (snake.some((x) => arePositionsEqual(x, newPosition))) {
    lose();
    return;
  }

  // Before: snake = [ [3, 4], [4, 5], [2, 6] ]
  // After: snake = [ newPosition, [3, 4], [4, 5], [2, 6] ]
  snake.unshift(newPosition);
  repaint();
}

document.addEventListener("keydown", handleKeyDown);

setupScene();
setup();