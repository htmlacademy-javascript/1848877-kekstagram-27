import {isMaxLength} from './data.js';

export const commentsField = document.querySelector('.text__description');
export const hashtagField = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

const MAX_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const HASHTAG_RULE = /[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

export const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__inner'
});

//создание массива хештегов
const createHashtagArray = (value) => value.split(' ');

//проверка на валидность хештега
const isValidHashtag = (value) => {
  if(value === '') {
    return true;
  }
  const hashtag = createHashtagArray(value);
  const isValid = (test) => HASHTAG_RULE.test(test);

  const allHashtagIsValid = hashtag.every(isValid);

  if (allHashtagIsValid) {
    return hashtag;
  }
};

pristine.addValidator(hashtagField, isValidHashtag,'Хештег должен содержать буквы, числа (не более 20 символов, включая #)');

//Проверка на условие "Не более 5 хештегов"
const isHashTagsLengthValid = (value) => {
  if(value === '') {
    return true;
  }
  const hashtag = createHashtagArray(value);

  if (hashtag.length <= MAX_HASHTAGS) {
    return hashtag;
  }
};

pristine.addValidator(hashtagField, isHashTagsLengthValid,`нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`);

const isHashtagStartValid = (value) => {
  if(value === '') {
    return true;
  }
  const hashtagList = createHashtagArray(value);
  const isValid = hashtagList.every((hashtag) => Array.from(hashtag)[0] === '#');

  if (isValid) {
    return hashtagList;
  }
};

pristine.addValidator(hashtagField, isHashtagStartValid,'Хэштег должен начинаться с "#"');

//один и тот же хэш-тег не может быть использован дважды
const getUniqeHashtag = (value) => {
  if(value === '') {
    return true;
  }
  const hashtag = createHashtagArray(value);
  const uniqHashtag = new Set(hashtag);
  return uniqHashtag.size === hashtag.length;
};

pristine.addValidator(hashtagField, getUniqeHashtag,'один и тот же хэш-тег не может быть использован дважды');

//длина комментария не больше 140
const isCommentLengthValid = (value) => isMaxLength(value, MAX_LENGTH_COMMENT);

pristine.addValidator(commentsField, isCommentLengthValid, `Не более ${MAX_LENGTH_COMMENT} символов`);
