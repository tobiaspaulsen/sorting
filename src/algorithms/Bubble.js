import { swap } from "./Helpers";

const bubble = (array, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();
  let colorCopy;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
        arraySteps.push(array.slice());
        colorCopy = standardColors.slice();
        colorCopy[j] = 1;
        colorCopy[j + 1] = 1;
        colorSteps.push(colorCopy);
      } else {
        arraySteps.push(array.slice());
        colorCopy = standardColors.slice();
        colorCopy[j] = 2;
        colorCopy[j + 1] = 2;
        colorSteps.push(colorCopy);
      }
    }
    standardColors[array.length - i - 1] = 4;
    arraySteps.push(array.slice());
    colorSteps.push(standardColors.slice());
  }
  arraySteps.push(array.slice());
  colorSteps.push(colorSteps[0].slice());
};

export default bubble;
