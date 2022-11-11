import {pristine, commentsField, hashtagField, resetFormValidation} from './validation.js';
import {setDefaultValue} from './resize-image.js';
import {resetSliderInit, resetSlider, resetEffect} from './picture-effect.js';
import {savePhoto} from './api.js';
import {closeUploadPopup, showErrorMessage, showSuccessMessage, showUploadPopup} from './modals.js';
import {uploadFiles} from './upload-file.js';

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
  const isHashTagsFocused = document.activeElement === hashtagField;
  const isCommentFocused = document.activeElement === commentsField;
  const isReadyForClose = !isHashTagsFocused && !isCommentFocused;

  showUploadPopup(() => {
    resetSliderInit();
    resetSlider();

    setDefaultValue();
    uploadFiles(evt.target.files[0]);
  }, isReadyForClose, resetUploadForm);
};

export const closeUploadPopupHandler = () => {
  const isHashTagsFocused = document.activeElement === hashtagField;
  const isCommentFocused = document.activeElement === commentsField;
  const isReadyForClose = !isHashTagsFocused && !isCommentFocused;

  closeUploadPopup(resetUploadForm, isReadyForClose);
};

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
