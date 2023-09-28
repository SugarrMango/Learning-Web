let board = document.querySelector(".board");
let counterElement = document.querySelector(".counter");
let timerElement = document.querySelector(".timer");

// for i in range(400):
for (let i = 0; i < 400; i += 1) {
  let cell = document.createElement("div");
  cell.className = "cell default";
  board.appendChild(cell);
}

function getIndex(r, c) {
  return 20 * r + 1 * c;
}

function changeType(position, type) {
  let index = getIndex(position[0], position[1]);
  let cell = board.children.item(index);
  if (!cell) {
    return;
  }
  cell.className = `cell ${type}`;
}

function generatePosition() {
  let r = Math.floor(Math.random() * 20);
  let c = Math.floor(Math.random() * 20);
  return [r, c];
}

const FRUIT_TYPE = "fruit";
const SNAKE_TYPE = "snake";
const DEFAULT_TYPE = "default";

let fruit, snake;
let direction = "none";
let interval, timerInterval;
let counter;
let timer;

function repaint() {
  for (let r = 0; r < 20; r += 1) {
    for (let c = 0; c < 20; c += 1) {
      changeType([r, c], DEFAULT_TYPE);
    }
  }

  for (let x of snake) {
    changeType(x, SNAKE_TYPE);
  }

  changeType(fruit, FRUIT_TYPE);
}

function setTimer(t) {
  timer = t;
  let minutes = Math.floor(t / 60).toString();
  let seconds = (t % 60).toString();
  timerElement.textContent = `${minutes.padStart(2, "0")}:${seconds.padStart(
    2,
    "0"
  )}`;
}

function increaseTimer() {
  setTimer(timer + 1);
}

function setup() {
  fruit = generatePosition(); // [r, c]
  snake = [generatePosition()];
  counter = 0;
  setTimer(0);
  counterElement.textContent = counter;
  repaint();

  interval = setInterval(move, 100);
  timerInterval = setInterval(increaseTimer, 1000);
  direction = "none";
}

function handleKeyDown(event) {
  const key = event.key;

  if (key === "ArrowLeft") {
    if (direction !== "right") {
      direction = "left";
    }
  } else if (key === "ArrowRight") {
    if (direction !== "left") {
      direction = "right";
    }
  } else if (key === "ArrowUp") {
    if (direction !== "down") {
      direction = "up";
    }
  } else if (key === "ArrowDown") {
    if (direction !== "up") {
      direction = "down";
    }
  }
}

function lose() {
  alert("You lost!");
  clearInterval(interval);
  clearInterval(timerInterval);
  setup();
}

function arePositionsEqual(a, b) {
  if (a[0] == b[0] && a[1] == b[1]) {
    return true;
  } else {
    return false;
  }
}

function move() {
  if (direction == "none") {
    return;
  }

  let r = snake[0][0];
  let c = snake[0][1];

  let newPosition;

  if (direction == "left") {
    newPosition = [r, c - 1];
  } else if (direction == "right") {
    newPosition = [r, c + 1];
  } else if (direction == "up") {
    newPosition = [r - 1, c];
  } else if (direction == "down") {
    newPosition = [r + 1, c];
  }

  r = newPosition[0];
  c = newPosition[1];

  if (r < 0 || c < 0 || r > 19 || c > 19) {
    lose();
    return;
  }

  if (arePositionsEqual(newPosition, fruit)) {
    // The food has been eaten
    fruit = generatePosition();
    counter += 1;
    counterElement.textContent = counter;

    while (snake.some((x) => arePositionsEqual(x, fruit))) {
      fruit = generatePosition();
    }
  } else {
    // Before: snake = [ [3, 4], [4, 5], [2, 6], [7, 8] ]
    // After: snake = [ [3, 4], [4, 5], [2, 6] ]
    snake.pop();
  }

  // Before: snake = [ [3, 4], [4, 5], [2, 6] ]
  // After: snake = [ newPosition, [3, 4], [4, 5], [2, 6] ]

  // Did the snake eat itself?
  // Does the snake contain newPosition?

  // snake = [ [2, 3], [3, 6] ]
  // snake.includes([2, 3])? -> false

  if (snake.some((x) => arePositionsEqual(x, newPosition))) {
    lose();
    return;
  }

  snake.unshift(newPosition);

  // value-based for loop
  // in python:
  // for x in snake:
  //   print(x)

  repaint();
}

document.addEventListener("keydown", handleKeyDown);

setup();