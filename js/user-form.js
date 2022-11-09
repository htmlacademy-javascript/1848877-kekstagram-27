import {pristine, commentsField, hashtagField, resetFormValidation} from './validation.js';
import {setDefaultValue} from './resize-image.js';
import {resetSliderInit, resetSlider, resetEffect} from './picture-effect.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message-upload.js';
import {uploadFiles} from './upload-file.js';

const ALERT_SHOW_TIME = 5000;

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const showUploadPopupHandler = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyDownHandler);

  resetSliderInit();
  resetSlider();

  setDefaultValue();
  uploadFiles(evt.target.files[0]);
};

export const closeUploadPopupHandler = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
  imgUploadForm.reset();
  resetEffect();
  resetFormValidation();
};

uploadFile.addEventListener('change', showUploadPopupHandler);

uploadCancel.addEventListener('click', closeUploadPopupHandler);

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
function keyDownHandler (evt) {
  const isHashTagsFocused = document.activeElement === hashtagField;
  const isCommentFocused = document.activeElement === commentsField;

  if (evt.key === 'Escape' && !isHashTagsFocused && !isCommentFocused) {
    evt.preventDefault();
    closeUploadPopupHandler();
  }
}

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSuccess = () => {
  enableSubmitButton();
  showSuccessMessage();
  closeUploadPopupHandler();
};

const onError = () => {
  showErrorMessage();
  enableSubmitButton();
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (isFormValid) {
    disableSubmitButton();
    sendData(
      onSuccess,
      onError,
      new FormData(evt.target)
    );
  }
});

export const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

