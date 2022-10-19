import {getRandomPhotosInformation, PHOTO_INFORMATION_COUNTERS} from './data.js';
import {toggleModal, enlargePhoto} from './Size-Full-Images.js';
const thumbnailPicture = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');

const randomPhotoInformation = getRandomPhotosInformation(PHOTO_INFORMATION_COUNTERS);

const renderPhoto = (posts) => {
  const photoInformationFragment = document.createDocumentFragment();

  posts.forEach((item) => {
    const { url, comments, likes} = item;
    const randomPicture = thumbnailPicture.cloneNode(true);

    randomPicture.querySelector('.picture__img').src = url;
    randomPicture.querySelector('.picture__comments').textContent = comments.length;
    randomPicture.querySelector('.picture__likes').textContent = likes;

    photoInformationFragment.appendChild(randomPicture);

    randomPicture.addEventListener('click', () => {
      toggleModal();
      enlargePhoto(item);
    });
  });
  thumbnailContainer.appendChild(photoInformationFragment);
};

renderPhoto(randomPhotoInformation);
