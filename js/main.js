const NAME = [
  'Kate',
  'Piter',
  'Oliver',
  'George',
  'Jack',
  'Olivia',
  'Harry',
  'Amelia ',
  'Jacob ',
  'Emily',
  'Charlie',
  'Ava ',
  'Thomas',
  'Jessica',
  'Oscar',
  'Isabella',
  'William',
  'Sophie',
  'James',
  'Mia',
  'Ruby',
  'Lily',
  'Anna',
  'Djonson',
  'Azazel',
  'Zirael'
];

const DESCRIPTION = [
  'Кушаю кексик',
  'Уронил банан',
  'Это я и моя бабушка',
  'Мой завтрак',
  'Люблю котиков',
  'Угадай, где я'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_INFORMATION_COUNTER = 25;

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

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomPhotoInformation = (id) => ({
  id: id + 1,
  url: `photos/${ id + 1 }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber (15, 200),
  comments: {
    id: id + 1,
    avatar: `img/avatar-${ getRandomNumber (1, 6) }.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME)
  }
});

const getRandomPhotosInformation = (length) => Array.from({length: length}, (_, index) => getRandomPhotoInformation(index));

getRandomPhotosInformation(PHOTO_INFORMATION_COUNTER);
