import {getRandomPhotosInformation, PHOTO_INFORMATION_COUNTERS} from './data.js';
import {renderPictureDialog} from './size-full-images.js';

const thumbnailPicture = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const imageContainer = document.querySelector('.photos-gallery');

const randomsPhoto = getRandomPhotosInformation(PHOTO_INFORMATION_COUNTERS);
//создание фотографии (миниатюры)
const createPictureElement = (data) => {
  const { url, comments, likes, id} = data;
  const photoElement = thumbnailPicture.cloneNode(true);

  photoElement.classList.add('content');
  photoElement.dataset.id = id;
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  return photoElement;
};
//обработчик, срабатывает если кликают по миниатюре, то тогда открывается большая фотография
gallery.addEventListener('click', (evt) => {
  evt.preventDefault();

  const element = evt.target.closest('[data-id]');

  const picture = element ? randomsPhoto.find((item) => item.id === Number(element.dataset.id)) : null;

  if (picture) {
    renderPictureDialog(picture);
  }
});
//добавление фотографии в контейнер
const renderPhoto = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    photosFragment.appendChild(createPictureElement(photo));
  });

  imageContainer.innerHTML = '';
  imageContainer.appendChild(photosFragment);
};

renderPhoto(randomsPhoto);
