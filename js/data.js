import {getData} from './api.js';
import {showAlertMessage} from './modals.js';

let dataList = [];

export const initData = (cbSuccess) => {
  getData(
    (photos) => {
      dataList = photos;

      if (cbSuccess) {cbSuccess(dataList);}
    },
    () => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};

export const readData = () => dataList;
