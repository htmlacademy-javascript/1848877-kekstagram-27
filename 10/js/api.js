import {showAlertMessage} from './user-form.js';

const DATA_INCOMING_SERVER = 'https://27.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE_INCOMING_SRVER = 'Не удалось загрузить данные с сервера';
const ERROR_MESSAGE_FORM = 'Не удалось отправить форму. Попробуйте ещё раз';
const DATA_SEND_SERVER = 'https://27.javascript.pages.academy/kekstagram';

export const getData = (onSuccess) => {
  fetch(DATA_INCOMING_SERVER)
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(() => {
      showAlertMessage(ERROR_MESSAGE_INCOMING_SRVER);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    DATA_SEND_SERVER,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail(ERROR_MESSAGE_FORM);
    }
  }).catch(() => {
    onFail(ERROR_MESSAGE_FORM);
  });
};

