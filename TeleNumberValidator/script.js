const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultDiv = document.getElementById("results-div");

function isValid(str) {
  const usNumberRegex = /^(?:1\s?)?(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
  return usNumberRegex.test(str);
}

const handle = () => {
  let input;
  if ((input = userInput.value) === '') {
    alert("Please provide a phone number");
    return;
  }
  const result = (isValid(input) ? "Valid" : "Invalid") + " US number: " + input;
  resultDiv.textContent = result;
}

checkButton.addEventListener("click", handle)
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter")
    handle();
});

clearButton.addEventListener("click", () => resultDiv.textContent = '')



