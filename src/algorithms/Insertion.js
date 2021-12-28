import { swap } from "./Helpers";

const insertion = (arr, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();
  let colorCopy, j, colors;
  for (let i = 1; i < arr.length; i++) {
    standardColors[i] = 4;
  }

  for (let i = 1; i < arr.length; i++) {
    j = i;
    arraySteps.push(arr.slice());
    standardColors[i] = 0;
    colorCopy = standardColors.slice();
    colorCopy[i] = 3;
    colorSteps.push(colorCopy);

    while (j > 0 && arr[j - 1] > arr[j]) {
      swap(arr, j - 1, j);
      arraySteps.push(arr.slice());
      colors = colorCopy.slice();
      colors[j] = 1;
      colors[j - 1] = 1;
      colorSteps.push(colors);

      j = j - 1;
    }
  }
  arraySteps.push(arr.slice());
  colorSteps.push(colorSteps[0].slice());
};

export default insertion;
