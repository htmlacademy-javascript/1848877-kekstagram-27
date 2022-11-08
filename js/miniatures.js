import {renderPictureDialog, keyDownHandler, openBigPicture} from './big-picture.js';
import {getData} from './api.js';
import {getPhotosFromServer} from './filters.js';
import {showAlertMessage} from './user-form.js';

const NUMBER_OF_PHOTOS = 25;

const thumbnailPicture = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const imageContainer = document.querySelector('.photos-gallery');

let dataList = [];

const createPictureElement = (data) => {
  const { url, comments, likes, id} = data;
  const photoElement = thumbnailPicture.cloneNode(true);

  photoElement.dataset.id = id;
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  return photoElement;
};

gallery.addEventListener('click', (evt) => {
  const element = evt.target.closest('[data-id]');
  const picture = element
    ? dataList.find((item) => item.id === Number(element.dataset.id))
    : null;

  if (picture) {
    renderPictureDialog(picture);
    openBigPicture();

    document.addEventListener('keydown', keyDownHandler);
  }
});

export const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    photosFragment.appendChild(createPictureElement(photo));
  });

  imageContainer.innerHTML = '';
  imageContainer.appendChild(photosFragment);
};

getData (
  (photos) => {
    dataList = photos.slice(0, NUMBER_OF_PHOTOS);
    renderPhotos(dataList);
    getPhotosFromServer(dataList);
  },
  () => {
    showAlertMessage('Не удалось загрузить данные с сервера');
  });

