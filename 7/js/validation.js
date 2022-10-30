import {isMaxLength} from './data.js';

const MAX_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const HASHTAG_RULE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

export const commentsField = document.querySelector('.text__description');
export const hashtagField = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

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

//Проверка на условие "Не более 5 хештегов"
const isHashTagsLengthValid = (value) => {
  const hashtag = createHashtagArray(value);

  if (hashtag.length <= MAX_HASHTAGS) {
    return hashtag;
  }
};

//один и тот же хэш-тег не может быть использован дважды
const isUniqeHashtag = (value) => {
  const hashtag = createHashtagArray(value);
  const uniqHashtag = new Set(hashtag);

  return uniqHashtag.size === hashtag.length;
};

//длина комментария не больше 140
const isCommentLengthValid = (value) => isMaxLength(value, MAX_LENGTH_COMMENT);

pristine.addValidator(hashtagField, isValidHashtag,'Хештег должен начинаться с "#", содержать буквы, числа (не более 20 символов, включая #)');
pristine.addValidator(hashtagField, isHashTagsLengthValid,`нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`);
pristine.addValidator(hashtagField, isUniqeHashtag,'один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(commentsField, isCommentLengthValid, `Не более ${MAX_LENGTH_COMMENT} символов`);
