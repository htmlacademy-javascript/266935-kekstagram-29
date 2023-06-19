const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('string',5);

const isStringPalindrom = (string) => {

  const NORMAL_STRING = string.replaceAll(' ','').toLowerCase();

  let reverseString = '';

  for (let i = NORMAL_STRING.length - 1; i > -1; i--){
    reverseString += NORMAL_STRING[i];
  }

  return NORMAL_STRING === reverseString;

};

isStringPalindrom('totot');


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

getPositiveInteger('test 2023');

