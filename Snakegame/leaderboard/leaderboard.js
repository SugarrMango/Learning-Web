// <ol class="leaderboard"></ol>
let leaderboard = document.querySelector(".leaderboard");

function addRecord(points, time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const text = `${points} points in ${minutes} minutes and ${seconds} seconds`;
  const listItem = document.createElement("li");
  listItem.textContent = text;
  leaderboard.appendChild(listItem);
}

function setup() {
  const str = localStorage.getItem("leaderboard");
  const store = str ? JSON.parse(str) : [];

  for (let record of store) {
    addRecord(record.points, record.time);
  }
  // addRecord(100, 50);
  // addRecord(80, 30);
  // addRecord(75, 300);
}

setup();