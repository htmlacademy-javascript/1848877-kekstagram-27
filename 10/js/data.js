import {getData} from './api.js';
import {showAlertMessage} from './user-form.js';

const NUMBER_OF_PHOTOS = 25;

export let dataList = [];

export const initData = (cbSuccess) => {
  getData (
    (photos) => {
      dataList = photos.slice(0, NUMBER_OF_PHOTOS);
      if (cbSuccess) {cbSuccess(dataList);}
    },
    () => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};


