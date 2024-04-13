const sortButton = document.getElementById("sort");


const sortInputArray = (event) => {
  event.preventDefault();
  const inputValues = [...document.getElementsByClassName("values-dropdown")]
    .map(dropdown => Number(dropdown.value));
  const sortedValues = insertionSort(inputValues);
  updateUI(sortedValues);

}

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })

}

const bubbleSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

const insertionSort = (array) => {
  const result = [array[0]];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > result[i - 1]) {
      result.push(array[i])
    } else {
      const index = result.findIndex((value) => value > array[i]);
      result.splice(index, 0, array[i]);
    }
  }
  return result;
}

const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex])
        minIndex = j;
    }
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}

sortButton.addEventListener("click", sortInputArray);







