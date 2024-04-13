const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const div = document.getElementById("output");
const form = document.getElementById("form");

const ref = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
];


button.addEventListener("click", () => {
  handleInput();
})

form.addEventListener("submit", e => {
  e.preventDefault();
  handleInput();
})

function handleInput() {
  const userInput = input.value;
  const numberInput = parseInt(userInput);
  if (!checkInput(userInput, numberInput))
    return;

  const result = arabicToRoman(numberInput);

  div.classList.remove("hidden");
  div.textContent = result;
}

const arabicToRoman = (num) => {
  const res = [];
  ref.forEach((arr) => {
    while (num >= arr[1]) {
      num -= arr[1];
      res.push(arr[0]);
    }
  });
  return res.join("");
};

const checkInput = (userInput, numberInput) => {
  div.innerText = "";
  div.classList.add("hidden");
  let errMsg = "";
  if (!userInput || isNaN(numberInput) || userInput.match(/[e.]/g))
    errMsg = "Please enter a valid number";
  else if (numberInput <= 0)
    errMsg = "Please enter a number greater than or equal to 1";
  else if (numberInput > 3999)
    errMsg = "Please enter a number less than or equal to 3999";

  if (errMsg) {
    div.textContent = errMsg;
    div.classList.remove("hidden");
    div.classList.add("alert");
    return false;
  } else
    return true;
};





