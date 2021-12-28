const mergeSort = (arr, arraySteps, colorSteps) => {
  const standardColors = colorSteps[0].slice();
  merge(arr, 0, arr.length, arraySteps, colorSteps);
  arraySteps.push(arr.slice());
  colorSteps.push(standardColors.slice());
};

function merge(arr, low, high, arraySteps, colorSteps) {
  let mid = Math.floor((low + high) / 2);
  if (high - low > 2) {
    merge(arr, low, mid, arraySteps, colorSteps);
    merge(arr, mid, high, arraySteps, colorSteps);
  }

  const standardColors = colorSteps[0].slice();

  for (let i = 0; i < arr.length; i++) {
    if (i < low || i >= high) {
      standardColors[i] = 4;
    } else if (low <= i && i < mid) {
      standardColors[i] = 6;
    }
  }
  arraySteps.push(arr.slice());
  colorSteps.push(standardColors.slice());

  if (high - low === 1) {
    return;
  }

  let left = low;
  let right = mid;

  let tmp = arr.slice();
  for (let i = low; i < high; i++) {
    if (right === high || (left < mid && tmp[left] <= tmp[right])) {
      arr[i] = tmp[left];
      standardColors[i] = 6;
      left++;
    } else {
      arr[i] = tmp[right];
      standardColors[i] = 0;
      right++;
    }
    let colorCopy = standardColors.slice();

    colorCopy[i] = 2;
    arraySteps.push(arr.slice());
    colorSteps.push(colorCopy);
  }
}

export default mergeSort;
