import {pristine, commentsField, hashtagField, resetFormValidation} from './validation.js';
import {setDefaultValue} from './resize-image.js';
import {resetSliderInit, resetSlider, resetEffect} from './picture-effect.js';
import {savePhoto} from './api.js';
import {showErrorMessage, showSuccessMessage, getActiveDialog} from './modals.js';
import {uploadFiles} from './upload-file.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const resetUploadForm = () => {
  imgUploadForm.reset();
  resetEffect();
  resetFormValidation();
};

const showUploadPopupHandler = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyDownHandler);

  resetSliderInit();
  resetSlider();
  setDefaultValue();
  uploadFiles(evt.target.files[0]);
};

const closeUploadPopupHandler = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetUploadForm();
  document.removeEventListener('keydown', keyDownHandler);
};

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
function keyDownHandler (evt) {
  const isHashTagsFocused = document.activeElement === hashtagField;
  const isCommentFocused = document.activeElement === commentsField;
  const isReadyForClose = !isHashTagsFocused && !isCommentFocused;

  if (evt.key === 'Escape' && isReadyForClose && !getActiveDialog()) {
    evt.preventDefault();
    resetUploadForm();
    closeUploadPopupHandler();
  }
}

uploadFile.addEventListener('change', showUploadPopupHandler);

uploadCancel.addEventListener('click', closeUploadPopupHandler);

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
  resetUploadForm();
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
    savePhoto(
      onSuccess,
      onError,
      new FormData(evt.target)
    );
  }
});

