import {getRandomPhotosInformation, PHOTO_INFORMATION_COUNTERS} from './data.js';
import {toggleModal, enlargePhoto, photoClickHandler} from './size-full-images.js';

const thumbnailPicture = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');

const randomPhotoInformation = getRandomPhotosInformation(PHOTO_INFORMATION_COUNTERS);

//const container = thumbnailContainer.querySelector('.content');

const createElement = (element, fragment) => {
  element.forEach((item) => {
    const { url, comments, likes} = item;
    const randomPicture = thumbnailPicture.cloneNode(true);

    randomPicture.querySelector('.picture__img').src = url;
    randomPicture.querySelector('.picture__comments').textContent = comments.length;
    randomPicture.querySelector('.picture__likes').textContent = likes;

    fragment.appendChild(randomPicture);

    randomPicture.addEventListener('click', () => {
      enlargePhoto(item);
    });
  });
};
/*
const createElement = (element) => {
  element.forEach((item) => {
    const { url, comments, likes} = item;
    const randomPicture = thumbnailPicture.cloneNode(true);

    randomPicture.querySelector('.picture__img').src = url;
    randomPicture.querySelector('.picture__comments').textContent = comments.length;
    randomPicture.querySelector('.picture__likes').textContent = likes;

    return randomPicture;
    });
  });
};
*/

const renderPhoto = (posts) => {
  const photoInformationFragment = document.createDocumentFragment();

  createElement(posts,photoInformationFragment);
  /*container.innerHTML = " ";
  createElement(posts,container);*/
  thumbnailContainer.appendChild(photoInformationFragment);
  /*thumbnailContainer.appendChild(container);*/
};

renderPhoto(randomPhotoInformation);
photoClickHandler(thumbnailContainer);
