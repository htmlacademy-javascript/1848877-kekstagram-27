import {getRandomNumber, getRandomArrayElement} from './util.js';

const NAMES = [
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

const DESCRIPTIONS = [
  'Кушаю кексик',
  'Уронил банан',
  'Это я и моя бабушка',
  'Мой завтрак',
  'Люблю котиков',
  'Угадай, где я'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const PHOTO_INFORMATION_COUNTERS = 25;

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoComments = () => Array.from(
  {length: getRandomNumber(0, 25)},
  (_, index) => createComment(index + 1),
);

const getRandomPhotoInformation = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber (15, 200),
  comments: createPhotoComments(),
});

export const getRandomPhotosInformation = (length) => Array.from(
  {length},
  (_, index) => getRandomPhotoInformation(index + 1)
);
