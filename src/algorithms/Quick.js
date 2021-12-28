import { swap } from "./Helpers";

const quick = (arr, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();

  sort(arr, 0, arr.length - 1, arraySteps, colorSteps);
  arraySteps.push(arr.slice());
  colorSteps.push(standardColors.slice());
};

function sort(arr, low, high, arraySteps, colorSteps) {
  if (low < high) {
    let p = partition(arr, low, high, arraySteps, colorSteps);
    sort(arr, low, p - 1, arraySteps, colorSteps);
    sort(arr, p + 1, high, arraySteps, colorSteps);
  }
}

function partition(arr, low, high, arraySteps, colorSteps) {
  const standardColors = colorSteps[0].slice();
  for (let i = 0; i < standardColors.length; i++) {
    if (i < low || i > high) {
      standardColors[i] = 4;
    }
  }

  let pivot = arr[high];
  standardColors[high] = 3;
  arraySteps.push(arr.slice());
  colorSteps.push(standardColors.slice());

  let left = low;
  let right = high - 1;

  let colorCopy;
  while (left <= right) {
    arraySteps.push(arr.slice());
    colorCopy = standardColors.slice();
    colorCopy[left] = 2;
    colorCopy[right] = 5;
    colorSteps.push(colorCopy);

    while (left <= right && arr[left] <= pivot) {
      left++;
      arraySteps.push(arr.slice());
      colorCopy = standardColors.slice();
      colorCopy[left] = 2;
      colorCopy[right] = 5;
      colorSteps.push(colorCopy);
    }
    while (left <= right && arr[right] > pivot) {
      right--;
      arraySteps.push(arr.slice());
      colorCopy = standardColors.slice();
      colorCopy[left] = 2;
      colorCopy[right] = 5;
      colorSteps.push(colorCopy);
    }
    if (left < right) {
      swap(arr, left, right);
      arraySteps.push(arr.slice());
      colorCopy = standardColors.slice();
      colorCopy[left] = 1;
      colorCopy[right] = 1;
      colorSteps.push(colorCopy);
      left++;
      right--;
    }
  }
  swap(arr, left, high);
  arraySteps.push(arr.slice());
  colorCopy = standardColors.slice();
  colorCopy[left] = 1;
  colorCopy[high] = 1;
  colorSteps.push(colorCopy);

  return left;
}

export default quick;
