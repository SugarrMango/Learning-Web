let difficultyInputElement = document.querySelector("#difficulty");
let difficultyNameElement = document.querySelector(".difficulty-name");
let difficultyDescriptionElement = document.querySelector(
  ".difficulty-description"
);

const difficulties = [
  {
    level: 1,
    name: "Slithering Starter",
    description:
      "The perfect starting point for beginners, offering a relaxed pace to learn the game.",
  },
  {
    level: 2,
    name: "Serpentine Sprint",
    description:
      "A step up in challenge with a faster-moving snake, ideal for improving your skills.",
  },
  {
    level: 3,
    name: "Rapid Reptile",
    description:
      "The snake darts around the screen with increased speed, testing your precision and strategy.",
  },
  {
    level: 4,
    name: "Venomous Velocity",
    description:
      "Lightning-fast gameplay that demands exceptional coordination and skill.",
  },
  {
    level: 5,
    name: "Fury of the Python",
    description:
      "The ultimate challenge with the snake at maximum speed, reserved for the most skilled players.",
  },
];

function updateDifficulty(level) {
  let difficulty = difficulties.find((d) => d.level === level);

  difficultyNameElement.textContent = difficulty.name;
  difficultyDescriptionElement.textContent = difficulty.description;

  localStorage.setItem("difficulty", level);
}

function handleChange(event) {
  let level = Number(event.target.value); // "5"
  updateDifficulty(level);
}

updateDifficulty(3);
difficultyInputElement.addEventListener("change", handleChange);