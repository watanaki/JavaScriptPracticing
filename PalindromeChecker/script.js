const checkButton = document.getElementById("check-btn");
const inputText = document.getElementById("text-input");
const resultArea = document.getElementById("result");

function showResult(input, isPali) {
  resultArea.innerHTML = '';
  const result_p = document.createElement("p");
  result_p.setAttribute("class", "user-input");
  const result_strong = document.createElement("strong");
  result_strong.textContent = input;
  result_p.appendChild(result_strong);
  result_p.appendChild(document.createTextNode(` is${isPali ? "" : " not"} a palindrome`));
  resultArea.appendChild(result_p);
  resultArea.classList.remove("hidden");
}

function checkPali() {
  const input = inputText.value;
  if (input === '') {
    //single spcae is not detected
    alert("Please input a value");
    return;
  }

  let isPali = false;
  if (input.length === 1) {
    isPali = true;
  } else {
    let temp = input.replace(/[^\da-zA-Z]/g, "").toLowerCase();
    isPali = temp === [...temp].reverse().join('') ? true : false;
  }
  showResult(input, isPali);
  inputText.value = '';
}

checkButton.addEventListener("click", () => { checkPali() });
checkButton.addEventListener("keypress", e => {
  if (e.key === 'Enter')
    checkPali();
});