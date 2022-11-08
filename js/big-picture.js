import {renderPictureComments} from './big-picture-comments.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const socialCaption = document.querySelector('.social__caption');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');

export const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
};

export const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
export function keyDownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeBigPicture();
  }
}

const cancelButtonHandler = () => {
  closeBigPicture();
};

closeButton.addEventListener('click', cancelButtonHandler);

export const renderPictureDialog = (picture) => {
  const { url, comments, likes, description } = picture;

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  renderPictureComments({comments});
};


