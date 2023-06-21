const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_DESCRIPTIONS_COUNT = 25;
const MAX_COMMENTS_AMOUNT = 30;
const MIN_LIKE_AMOUNT = 15;
const MAX_LIKE_AMOUNT = 200;

const getRandomInteger = (a,b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getMessage = () => {
  const SENTENSES_AMOUNT = getRandomInteger(1, 2);
  let resultMessage = '';
  for (let i = 1; i <= SENTENSES_AMOUNT; i++) {
    resultMessage += COMMENTS[getRandomInteger(1, COMMENTS.length - 1)];
  }
  return resultMessage;
};

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function(){
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

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

const generateDescriptionID = createIdGenerator();
const generateURLID = createIdGenerator();
const generateCommentID = createRandomIDFromRangeGenerator(1, SIMILAR_DESCRIPTIONS_COUNT * MAX_COMMENTS_AMOUNT);

const createComment = () => ({
  id: generateCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getMessage(),
  name: NAMES[getRandomInteger(1, NAMES.length - 1)],
});

const createDescription = () => ({
  id: generateDescriptionID(),
  url: `photos/${generateURLID()}.jpg`,
  description: 'тестовый объект',
  likes: getRandomInteger(MIN_LIKE_AMOUNT, MAX_LIKE_AMOUNT),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_AMOUNT)},createComment),
});

const similarDescriptions = () => Array.from({length: SIMILAR_DESCRIPTIONS_COUNT}, createDescription);
similarDescriptions();


