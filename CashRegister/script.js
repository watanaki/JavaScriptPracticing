const userInput = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchase = document.getElementById('purchase-btn');

let price = 3.26;
let cid = [
  ["PENNY", 0],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

document.getElementById('price-screen').textContent = `Total:$${price}`;

const changeLeft = amount => {
  const cid_sum = cid.reduce((sum, change) => sum += change[1], 0);
  return cid_sum - amount;
}

const updateUI = (result) => {
  document.getElementById('cash-drawer-display').innerHTML = `
<p>
  <strong>Change in drawer:</strong>
</p>
<p>Pennies: $${cid[0][1]}</p>
<p>Nickels: $${cid[1][1]}</p>
<p>Dimes: $${cid[2][1]}</p>
<p>Quarters: $${cid[3][1]}</p>
<p>Ones: $${cid[4][1]}</p>
<p>Fives: $${cid[5][1]}</p>
<p>Tens: $${cid[6][1]}</p>
<p>Twenties: $${cid[7][1]}</p>
<p>Hundreds: $${cid[8][1]}</p>
`
  if (result) {
    const { status, changeList } = result;
    let changeContent = `<p>Status: ${status}</p>`;
    changeList.forEach(([currency, num]) => {
      changeContent += `\n<p>${currency}: $${num}</p>`
    })
    changeDue.innerHTML = changeContent;
  }
}

const calculateChange = () => {
  const cash = Number(userInput.value);
  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
  } else if (cash === price) {
    changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
  } else {    //need a change
    const result = {};
    let amountToBeChanged = cash - price;
    const moneyLeft = changeLeft(amountToBeChanged);

    if (moneyLeft < 0) {
      result.status = "INSUFFICIENT_FUNDS";
      result.changeList = [];
    } else {

      if (moneyLeft > 0)
        result.status = "OPEN";
      else
        result.status = "CLOSED";

      const changeResult = [];
      const denomination = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
      cid
        .slice()
        .reverse()
        .forEach(([currency, num], index) => {
          if (denomination[index] < amountToBeChanged && num !== 0) {
            const times = Math.floor(amountToBeChanged / denomination[index]);
            const a = denomination[index] * times;
            const minus = a > num ? num : a;
            amountToBeChanged = Number((amountToBeChanged - minus).toFixed(2));
            cid[cid.length - index - 1][1] -= minus;
            changeResult.push([currency, minus]);
          }
        });
      result.changeList = changeResult;
      if (amountToBeChanged !== 0) {
        result.status = 'INSUFFICIENT_FUNDS';
        result.changeList = []
      }
    }
    updateUI(result);
  }
}

updateUI();
purchase.addEventListener("click", calculateChange);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    calculateChange();
  }
});