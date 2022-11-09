const DATA_INCOMING_SERVER = 'https://27.javascript.pages.academy/kekstagram/data';
const DATA_SEND_SERVER = 'https://27.javascript.pages.academy/kekstagram';

export const getData = (onSuccess, onError) => {
  fetch(DATA_INCOMING_SERVER)
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(() => {
      onError();
    });
};

export const sendData = (onSuccess, onError, body) => {
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
      onError();
    }
  }).catch(() => {
    onError();
  });
};

