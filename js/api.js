const SAVE_PHOTO_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const GET_PHOTOS_URL = 'https://27.javascript.pages.academy/kekstagram';

export const getPhotos = (onSuccess, onError) => {
  fetch(SAVE_PHOTO_URL)
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(() => {
      onError();
    });
};

export const savePhoto = (onSuccess, onError, body) => {
  fetch(
    GET_PHOTOS_URL,
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

