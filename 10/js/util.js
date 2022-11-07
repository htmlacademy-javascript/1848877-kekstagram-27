/*const getRandomNumber = (minNumber, maxNumber) => {
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
export const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];*/

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const getRandomUniqeElement = (arr) => [...arr].sort(() => Math.random() - 0.5);
