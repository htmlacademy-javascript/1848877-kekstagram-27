const getRandomNumber = (minNumber, maxNumber) => {
  let min = Math.ceil(minNumber);
  let max = Math.floor(maxNumber);
  if (max < min) {
    const number = min;
    min = max;
    max = number;
  }
  if (min < 0 || max < 0) {
    return NaN;
  }
  return Math.floor (Math.random() * (max - min + 1)) + min;
};
getRandomNumber (1, 10);
const getCheckStringLength = (stringToTest , maxLength) => {
  return (stringToTest.length < maxLength) ? (true): (false);
};
getCheckStringLength ('House', 10);
