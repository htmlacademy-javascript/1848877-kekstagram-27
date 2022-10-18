import {getRandomPhotosInformation, PHOTO_INFORMATION_COUNTERS} from './data.js';
const picture = document.querySelector('#picture');
const pictures = document.querySelector('.pictures');

const randomPhotoInformation = getRandomPhotosInformation(PHOTO_INFORMATION_COUNTERS);

const getRandomPhotoInformation = (posts) => {
  const photoInformationFragment = document.createDocumentFragment();

  posts.forEach((item) => {
    const { url, comments, likes} = item;
    const randomPicture = picture.cloneNode(true);
    const randomPhoto = randomPicture.content;

    randomPhoto.querySelector('.picture__img').src = url;
    randomPhoto.querySelector('.picture__comments').textContent = comments;
    randomPhoto.querySelector('.picture__likes').textContent = likes;

    photoInformationFragment.appendChild(randomPhoto);
  });

  pictures.appendChild(photoInformationFragment);
};

getRandomPhotoInformation(randomPhotoInformation);
