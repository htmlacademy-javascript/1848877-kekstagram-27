import {isMaxLength} from './data.js';
import {onKeyDown} from './big-picture.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const commentsField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const MAX_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'error__inner'
});

//создание массива хештегов
const createHashtagArray = (value) => value.split(' ');

//проверка на валидность хештега
const isValidHashtag = (value) => {
  const hashtag = createHashtagArray(value);
  const registr = /^#[a-zа-яё0-9]{1, 19}$/i;
  const isValid = (test) => registr.test(test);

  return hashtag.every(isValid);
};

pristine.addValidator(hashtagField, isValidHashtag,'Хэштег должен начинаться с "#", содержать буквы, числа (не более 20 символов, включая #)');

//Проверка на условие "Не более 5 хештегов" и один и тот же хештег не может быть использован дважды
const isHashTagsLengthValid = (value) => {
  const hashtag = createHashtagArray(value);

  if (hashtag.length <= MAX_HASHTAGS) {
    return hashtag;
  }
};
const ishHashTagsUniqetValid = (value) => {
  const hashtag = createHashtagArray(value);

  if (new Set(hashtag).size === hashtag.length) {
    return hashtag;
  }
};

pristine.addValidator(hashtagField, ishHashTagsUniqetValid,'один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(hashtagField, isHashTagsLengthValid,'нельзя указать больше пяти хэш-тегов');
//один и тот же хэш-тег не может быть использован дважды
/*const getUniqeHashtag = (value) => {
  const hashtag = createHashtagArray(value);
  return new Set(hashtag).size === hashtag.length;
};*/
//один и тот же хэш-тег не может быть использован дважды
/*const getUniqeHashtag = (value) => {
  const hashtag = createHashtagArray(value);
  const newHashtag = new Map ();
  for (const hastags of value) {
    const sorted = value.toLowerCase().split('').sort().join('');
    newHashtag.set(sorted, hastags);
  }
  return Array.from(newHashtag.values(hashtag));
};*/

//длина комментария не больше 140
const isCommentLengthValid = (value) => isMaxLength(value, MAX_LENGTH_COMMENT);

pristine.addValidator(commentsField, isCommentLengthValid, `Не более ${MAX_LENGTH_COMMENT} символов`);

//закрывает окно редактирования
export const closeOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();

  document.removeEventListener('keydown', onKeyDown);
  uploadCancel.removeEventListener('click', closeOverlay);
};

//открывает окно редактирования
const openOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDown);
};

//обработчик на открытие окна редактирования
uploadFile.addEventListener('change', openOverlay);

//обработчик на закрытие окна редактирования
uploadCancel.addEventListener('click', closeOverlay);

//проверка на валидность (активация/блокировка кнопки отправки)
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (isFormValid) {
    imgUploadForm.submit();
    submitButton.disabled(true);
  }

  submitButton.disabled (false);
});

