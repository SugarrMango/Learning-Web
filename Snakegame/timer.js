let timer;
let timerElement = document.querySelector(".timer");
let timerInterval;

function setTimer(t) {
  timer = t;
  let minutes = Math.floor(t / 60).toString();
  let seconds = (t % 60).toString();
  timerElement.textContent = `${minutes.padStart(2, "0")}:${seconds.padStart(
    2,
    "0"
  )}`;
}

function getTimer() {
  return timer;
}

function increaseTimer() {
  setTimer(timer + 1);
}

function resetTimer() {
  setTimer(0);
}

function startTimer() {
  timerInterval = setInterval(increaseTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
