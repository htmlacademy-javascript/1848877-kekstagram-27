import {pristine, commentsField, hashtagField} from './validation.js';
import {setDefaultValue} from './resize-image.js';
import {sliderInit, resetSlider, resetEffect} from './picture-effect.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message-upload.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const showModalHandler = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', KeyDownHandler);

  sliderInit();
  resetSlider();

  setDefaultValue();
};

export const closeModalHandler = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', KeyDownHandler);

  imgUploadForm.reset();

  resetEffect();
};

uploadFile.addEventListener('change', showModalHandler);

uploadCancel.addEventListener('click', closeModalHandler);

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
function KeyDownHandler (evt) {
  const focusHashTag = document.activeElement === hashtagField;
  const focusComment = document.activeElement === commentsField;

  if (evt.key === 'Escape' && !focusHashTag && !focusComment) {
    evt.preventDefault();

    closeModalHandler();
  }
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isFormValid = pristine.validate();

    if (isFormValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unBlockSubmitButton();
          showSuccessMessage();
        },
        () => {
          showErrorMessage();
          unBlockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};
