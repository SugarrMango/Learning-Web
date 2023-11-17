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

  // sort store
  // Your code here
  store.sort((low, high) => high.points - low.points);

  let topRecords = store.slice(0, 10);
   
  for (let record of topRecords) {
    addRecord(record.points, record.time);
  }
  // addRecord(100, 50);
  // addRecord(80, 30);
  // addRecord(75, 300);
}

setup();