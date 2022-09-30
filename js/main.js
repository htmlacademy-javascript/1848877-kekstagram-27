const getRandomNumber = function (minNumber, maxNumber) {
let min = Math.ceil(minNumber);
let max = Math.floor(maxNumber);
if (max < min) {
  let Number = min;
  min = max;
  max = Number;
}
if (min < 0 || max < 0){
  return NaN;
}
let RandomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
return RandomNumber;
};
getRandomNumber (1, 10)
const getCheckStringLength = function (stringToTest , maxLength){
  if ( stringToTest > maxLength || stringToTest.length > maxLength) {
    return false};
  return true;
}
getCheckStringLength ('House', 10)

