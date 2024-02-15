


const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map((num) => Number(num)).filter((el) => !isNaN(el));
  const mean = getMean(numbers);
  document.querySelector("#mean").textContent = mean;
  const median = getMedian(numbers);
  document.querySelector("#median").textContent = median;
  const mode = getMode(numbers);
  document.querySelector("#mode").textContent = mode;
  const range = getRange(numbers);
  document.querySelector("#range").textContent = range;
  const variance = getVariance(numbers);
  document.querySelector("#variance").textContent = variance;
  const standardDeviation = getStandardDeviation(numbers);
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const middleIndex = sorted.length / 2;
  return sorted.length % 2 === 0 ?
    getMean([sorted[middleIndex - 1], sorted[middleIndex]]) :
    sorted[Math.floor(middleIndex)];
};

const getMode = (array) => {
  let counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1)
    return null;
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);
  return mode.join(', ');



};

const getRange = (array) => Math.max(...array) - Math.min(...array);

const getVariance = (array) => {
  const mean = getMean(array);
  return variance = array.reduce((acc, el) => acc + (el - mean) ** 2, 0) / array.length;
};

const getStandardDeviation = (array) => Math.sqrt(getVariance(array));
