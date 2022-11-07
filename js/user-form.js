import {pristine, commentsField, hashtagField, resetFormValidation} from './validation.js';
import {setDefaultValue} from './resize-image.js';
import {sliderInit, resetSlider, resetEffect} from './picture-effect.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message-upload.js';
import {uploadFiles} from './upload-file.js';

const ALERT_SHOW_TIME = 5000;

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const showUploadPopup = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyDownHandler);  

  sliderInit();
  resetSlider();

  setDefaultValue();
  uploadFiles();
};

export const closeUploadPopup = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
  imgUploadForm.reset();
  resetEffect();
  resetFormValidation();
};

uploadFile.addEventListener('change', showUploadPopup);

uploadCancel.addEventListener('click', closeUploadPopup);

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
export function keyDownHandler (evt) {
  const focusHashTag = document.activeElement === hashtagField;
  const focusComment = document.activeElement === commentsField;

  if (evt.key === 'Escape' && !focusHashTag && !focusComment) {
    evt.preventDefault();
    closeUploadPopup();
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

const showSatisfactoryMessage = () => {
  enableSubmitButton();
  showSuccessMessage();
};

const showUnsatisfactoryMessage = () => {
  showErrorMessage();
  enableSubmitButton();
};

export const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isFormValid = pristine.validate();

    if (isFormValid) {
      disableSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSatisfactoryMessage();
        },
        () => {
          showUnsatisfactoryMessage();
        },
        new FormData(evt.target)
      );
    }
  });
};

export const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

setUserFormSubmit(closeUploadPopup);
