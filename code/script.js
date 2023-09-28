let batch = "";

function batchAlert(s) {
  batch += s;
  batch += "\n";
}

// Python
// x = 5
// # this is a comment

// Javascript
// this is a comment
let x = 5; // this is a normal variable
const y = 10; // this is a constant (so never changes)

// function = def is python
function func() {
  x = 12;
}

func();
batchAlert(x + " " + y);

// Conditionals
// python
// if x < y:
//       print("less")
// elif y < x:
//       print("more")
// else:
//       print("equal")

if (x < y) {
  batchAlert("less");
} else if (y < x) {
  batchAlert("more");
} else {
  batchAlert("equal");
}

// Arrays
// python
// a = [3, 4, 5]

let a = [3, 4, 5, 13, 4, 20];

// how to get first element?
// a[0] -> 3
// a[1] -> 4
// a[2] -> 5

batchAlert(a[0]);

// in python, last element
// print(a[-1])

// in python, to get the length of array
// print(len(a))

batchAlert(a.length); // = 6

// a[0] -> ... -> a[a.length - 1]
batchAlert("last 1: " + a[a.length - 1]);
batchAlert("last 2: " + a.at(-1));

// Strings
// python
// s = "hello"

let s = "hello";
batchAlert("s is " + s);

batchAlert("first: " + s[0]);
batchAlert("last: " + s.at(-1));

// Append a character to the end
s += "o";
batchAlert(s);

// Append a character to the beginning
s = "h" + s;
batchAlert(s);

// You can use both '' and ""
batchAlert("He said: 'let's have a lesson tomorrow'");

// Combine strings together
a = "hello";
b = "world";
batchAlert(a + " " + b);

// Backticks
batchAlert(`${a} ${b} ${5 + 4}`);
batchAlert(`${x} + ${y} = ${x + y}`);

// batchAlert(x + ' + ' + y + ' = ' + (x+y)) Bad practice, ugly code

// Functions
function myFunc() {
  batchAlert("My function has executed");
  return 5;
}

function add(a, b = 0, c = 0) {
  sum = a + b + c;
  return sum;
}

function subt(a, b = 0) {
  return a - b;
}

function op(a, b, s) {
  if (s == "add") {
    return add(a, b);
  } else {
    return subt(a, b);
  }
}

p = add(5, 2);
q = subt(4);
batchAlert("p is " + p);
batchAlert("q is " + q);
myFunc();

// Javascript STRICT equality

if (5 == "5") {
  batchAlert("they are the same (not strict)");
}

if (null == undefined) {
  batchAlert("end of the world");
}

// == comparison
// === strict comparison
// != not equal (not strictly)
// !== not equal (strictly)

if (5 === "5") {
  batchAlert("they are the same (strict)");
}

console.log(batch);
