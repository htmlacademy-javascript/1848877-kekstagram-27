import {getRandomPhotosInformation, PHOTO_INFORMATION_COUNTERS} from './data.js';

const picture = document.querySelector('#picture');

const pictures = document.querySelector('.pictures');

const photoInformationFragment = document.createDocumentFragment();

const randomPhotoInformation = getRandomPhotosInformation(PHOTO_INFORMATION_COUNTERS);

randomPhotoInformation.forEach((item) => {
  const { url, comments, likes} = item;

  const randomPicture = picture.cloneNode(true);

  const RANDOM_PHOTO = randomPicture.content;

  RANDOM_PHOTO.querySelector('.picture__img').src = url;
  RANDOM_PHOTO.querySelector('.picture__comments').innerHTML = comments;
  RANDOM_PHOTO.querySelector('.picture__likes').innerHTML = likes;

  photoInformationFragment.appendChild(RANDOM_PHOTO);
});

pictures.appendChild(photoInformationFragment);

