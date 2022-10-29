
import {onKeyDown} from './big-picture.js';
import {pristine, commentsField, hashtagField} from './validation.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');

export const closeOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();

  document.removeEventListener('keydown', onKeyDown);
};

const openOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDown);
};

uploadFile.addEventListener('change', openOverlay);

uploadCancel.addEventListener('click', closeOverlay);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (isFormValid) {
    imgUploadForm.submit();
    submitButton.disabled(true);
  }

  submitButton.disabled(false);
});

//если фокус на поле хештегов или комментария, по кнопке Esc не закрывается окно
form.addEventListener('keydown', (evt) => {
  if (document.activeElement === hashtagField || document.activeElement === commentsField) {
    evt.stopPropagation();
  }
});
/*
hashtagField.addEventListener('focus', (evt) => {
  evt.stopPropagation();
});

hashtagField.addEventListener('blur', () => {
  document.addEventListener('keydown', onKeyDown);
});

commentsField.addEventListener('focus', (evt) => {
  evt.stopPropagation();
});

commentsField.addEventListener('blur', () => {
  document.addEventListener('keydown', onKeyDown);
});*/
