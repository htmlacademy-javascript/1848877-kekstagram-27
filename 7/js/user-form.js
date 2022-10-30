
import {pristine, commentsField, hashtagField} from './validation.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const showModalHandler = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyDown);
};

export const closeModalHandler = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyDown);
  imgUploadForm.reset();
};

uploadFile.addEventListener('change', showModalHandler);

uploadCancel.addEventListener('click', closeModalHandler);

function onKeyDown (evt) {
  const focusHashTag = document.activeElement === hashtagField;
  const focusComment = document.activeElement === commentsField;

  if (evt.key === 'Escape' && !focusHashTag && !focusComment) {
    evt.preventDefault();

    closeModalHandler();
  }
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (isFormValid) {
    imgUploadForm.submit();
    submitButton.disabled = true;
  }

  submitButton.disabled = false;
});
