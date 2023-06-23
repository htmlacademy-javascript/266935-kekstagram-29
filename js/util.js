const getRandomInteger = (a,b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIDFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while(previousValues.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isStringPalindrom = (string) => {

  const NORMAL_STRING = string.replaceAll(' ','').toLowerCase();

  let reverseString = '';

  for (let i = NORMAL_STRING.length - 1; i > -1; i--){
    reverseString += NORMAL_STRING[i];
  }

  return NORMAL_STRING === reverseString;

};

const getPositiveInteger = (string) => {

  const WORK_STRING = string.toString();

  let resultString = '';

  for (let i = 0; i < WORK_STRING.length; i++){

    const INT_NUM = parseInt(WORK_STRING[i], 10);

    if (!Number.isNaN(INT_NUM)){
      resultString += INT_NUM.toString();
    }

  }

  return parseInt(resultString, 10);
};

export {getRandomInteger, createRandomIDFromRangeGenerator, checkStringLength, isStringPalindrom, getPositiveInteger};
