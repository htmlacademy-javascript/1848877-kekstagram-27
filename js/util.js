const TIME_OUT_DELAY = 500;

export const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
