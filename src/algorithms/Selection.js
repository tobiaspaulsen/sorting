import { swap } from "./Helpers";

const selection = (arr, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();
  let n = arr.length;
  let colorCopy, i, j, k;
  for (i = 0; i < n - 1; i++) {
    k = i;
    arraySteps.push(arr.slice());
    colorCopy = standardColors.slice();
    colorCopy[i] = 3;
    colorSteps.push(colorCopy);
    for (j = i + 1; j < n; j++) {
      arraySteps.push(arr.slice());
      colorCopy = standardColors.slice();
      colorCopy[j] = 2;
      colorCopy[k] = 3;
      colorSteps.push(colorCopy);
      if (arr[j] < arr[k]) {
        k = j;
        arraySteps.push(arr.slice());
        colorCopy = standardColors.slice();
        colorCopy[k] = 3;
        colorSteps.push(colorCopy);
      }
    }
    if (i !== k) {
      swap(arr, k, i);
      arraySteps.push(arr.slice());
      colorCopy = standardColors.slice();
      colorCopy[i] = 1;
      colorCopy[k] = 1;
      colorSteps.push(colorCopy);
    }
    standardColors[i] = 4;
  }

  arraySteps.push(arr.slice());
  colorSteps.push(colorSteps[0].slice());
};

export default selection;
