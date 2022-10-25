import {isMaxLength} from './data.js';
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const commentsField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags')


const MAX_HASHTAGS = 5;
const MAX_LENGTH = 140;

//создание массива хештегов
const createHashtagArray = (value) => {
  value.trim().toLowerCase().split(' ');
};
//проверка на валидность хештега
const isValidHashtag = (value) => {
  const hashtag = createHashtagArray(value);
  const registr = /^#[a-zа-яё0-9]{1, 19}$/i;
  const isValid = (value) => registr.test(value);
  return hashtag.every(isValid);
};
// не более 5 хештегов
const getNumberOfHashtags = (value) => {
  const hashtags = createHashtagArray(value);
  return hashtags.length <= MAX_HASHTAGS;
};
//один и тот же хэш-тег не может быть использован дважды
const getUniqeHashtag = (value) => {
  const hashtag = createHashtagArray(value);
  return new Set(hashtag).size === hashtag.length;
};
//длина комментария не больше 140
const getLengthComment = (value) => isMaxLength(value, MAX_LENGTH);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'error__inner'
});

pristine.addValidator(hashtagField, getUniqeHashtag,'один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(hashtagField, getNumberOfHashtags,'нельзя указать больше пяти хэш-тегов');
pristine.addValidator(hashtagField, isValidHashtag,'Хэштег должен начинаться с "#", содержать буквы, числа (не более 20 символов, включая #)');
pristine.addValidator(commentsField, getLengthComment, `Не более ${MAX_LENGTH} символов`);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const uploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

export const closeOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  uploadCancel.removeEventListener('click', closeOverlay);
};

uploadFile.addEventListener('click', uploadOverlay);

//document.addEventListener('keydown', onKeyDown);
uploadCancel.addEventListener('click', closeOverlay);


