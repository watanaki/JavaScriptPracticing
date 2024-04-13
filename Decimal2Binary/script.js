const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

function checkUserInput() {
  const inputValue = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputValue)) {
    alert("Please provide a decimal number");
    numberInput.value = "";
    return;
  }
  if (inputValue < 0) {
    alert("Positive number only!")
    numberInput.value = "";
    return;
  }
  result.textContent = decimalToBinary(inputValue);
  numberInput.value = "";
}

convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});

function decimalToBinary(input) {
  let result = "";
  if (input < 2)
    return `${input}`;
  else {
    result += String(input % 2);
    return String(decimalToBinary(Math.floor(input / 2))) + result;
  }
}

function binaryTest(input) {
  const result = [];
  if (input < 2)
    return [input];
  else {
    result.push(input % 2);
    result.unshift(...binaryTest(Math.floor(input / 2)));
    return result;
  }
}

