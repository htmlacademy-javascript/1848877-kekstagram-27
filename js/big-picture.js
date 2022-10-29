import {closeOverlay} from './user-form.js';
import {renderPictureComments} from './big-picture-comments.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const socialCaption = document.querySelector('.social__caption');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const body = document.body;

export const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeyDown);
};

export const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

export function onKeyDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    hideBigPicture();
    closeOverlay();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

closeButton.addEventListener('click', onCancelButtonClick);

export const renderPictureDialog = (picture) => {
  const { url, comments, likes, description } = picture;

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  renderPictureComments({comments});
};


