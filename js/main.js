const photoInformation = {
  id: 0,
  url: '',
  description: [
    'Кушаю кексик',
    'Уронил банан',
    'Это я и моя бабушка',
    'Мой завтрак',
    'Люблю котиков',
    'Угадай, где я'
  ],
  likes: 0,
  comments:
      { id: 0,
        avatar: '',
        message: [
          'Всё отлично!',
          'В целом всё неплохо. Но не всё.',
          'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
          'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
          'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
          'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
        ],
        name: [
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
        ]
      }
};

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

const getRandomPhotoInformation = (v, index) => ({
  id: index + 1,
  url: 'photos/'+ (index + 1) + '.jpg',
  description: getRandomArrayElement(photoInformation.description),
  likes: getRandomNumber (15, 200),
  comments: {
    id: index + 1,
    avatar: 'img/avatar-' + getRandomNumber (1, 6) + '.svg',
    message: getRandomArrayElement(photoInformation.comments.message),
    name: getRandomArrayElement(photoInformation.comments.name)
  }
});

const LENGTH_ARRAY = 25;

const getRandomPhotosInformation = Array.from({length: LENGTH_ARRAY}, getRandomPhotoInformation);

console.log(getRandomPhotosInformation);
