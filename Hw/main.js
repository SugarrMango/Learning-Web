let box = document.createElement("div");
let main = document.querySelector("main");

// box.style.width = "500px";
// box.style.height = "500px";
// box.style.display = "flex";
// box.style.justifyContent = "center";
// box.style.alignItems = "center";
box.style.backgroundColor = generate_color();
box.className = "box"
main.prepend(box)

function generate_color() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

let button = document.getElementById("colorButton"); 
button.addEventListener("click", change_color);

function change_color() {
  box.style.backgroundColor = generate_color();
}