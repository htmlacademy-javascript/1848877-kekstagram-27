import {renderPictureDialog, onKeyDown, loadComments} from './size-full-images.js';
import {getRandomPhotosInformation, PHOTO_INFORMATION_COUNTERS} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.body;
const thumbnailPicture = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const imageContainer = document.querySelector('.photos-gallery');

const getPhotoInformation = getRandomPhotosInformation(PHOTO_INFORMATION_COUNTERS);
//создание фотографии (миниатюры)
const createPictureElement = (data) => {
  const { url, comments, likes, id} = data;
  const photoElement = thumbnailPicture.cloneNode(true);

  photoElement.dataset.id = id;
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  return photoElement;
};

//функция, закрывающая окно
export const hideBigPicture = () => {
  bigPicture.classList.add('hidden'); // добавляется класс, для скрывания окна
  body.classList.remove('modal-open'); // добавл-ся класс для активации скролла
  document.removeEventListener('keydown', onKeyDown); //удаления обработчика закрытия по Esc
};

//обработчик, срабатывает если кликают по миниатюре, то тогда открывается большая фотография
gallery.addEventListener('click', (evt) => {
  evt.preventDefault();

  const element = evt.target.closest('[data-id]');
  const picture = element ? getPhotoInformation.find((item) => item.id === Number(element.dataset.id)) : null;

  if (picture) {
    renderPictureDialog(picture);
  }

  if(!element) {
    hideBigPicture();
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyDown);
  loadComments();
});

//добавление фотографии в контейнер
const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    photosFragment.appendChild(createPictureElement(photo));
  });

  imageContainer.innerHTML = '';
  imageContainer.appendChild(photosFragment);
};

renderPhotos(getPhotoInformation);
