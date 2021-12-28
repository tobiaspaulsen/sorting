import { swap } from "./Helpers";

const heap = (arr, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();
  const standardCopy = standardColors.slice();
  let n = arr.length;
  let i;

  for (i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, arraySteps, colorSteps, standardCopy);
  }
  let colorCopy;
  for (i = n - 1; i > 0; i--) {
    colorCopy = standardCopy.slice();
    swap(arr, 0, i);
    colorCopy[0] = 1;
    colorCopy[i] = 1;
    arraySteps.push(arr.slice());
    colorSteps.push(colorCopy);
    standardCopy[i] = 4;
    heapify(arr, i, 0, arraySteps, colorSteps, standardCopy);
  }

  arraySteps.push(arr.slice());
  colorSteps.push(standardColors.slice());
};

function heapify(arr, n, i, arraySteps, colorSteps, currentColors) {
  var largest = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;

  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    swap(arr, i, largest);
    let colorCopy = currentColors.slice();
    colorCopy[i] = 1;
    colorCopy[largest] = 1;
    arraySteps.push(arr.slice());
    colorSteps.push(colorCopy);

    heapify(arr, n, largest, arraySteps, colorSteps, currentColors);
  }
}

export default heap;
