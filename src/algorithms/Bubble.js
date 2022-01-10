import { swap } from "./Helpers";

const bubble = (arr, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();
  let colorCopy;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        arr = swap(arr, j, j + 1);
        arraySteps.push(arr.slice());
        colorCopy = standardColors.slice();
        colorCopy[j] = 1;
        colorCopy[j + 1] = 1;
        colorSteps.push(colorCopy);
      } else {
        arraySteps.push(arr.slice());
        colorCopy = standardColors.slice();
        colorCopy[j] = 2;
        colorCopy[j + 1] = 2;
        colorSteps.push(colorCopy);
      }
    }
    standardColors[arr.length - i - 1] = 4;
    arraySteps.push(arr.slice());
    colorSteps.push(standardColors.slice());
  }
  arraySteps.push(arr.slice());
  colorSteps.push(colorSteps[0].slice());
};

export default bubble;
