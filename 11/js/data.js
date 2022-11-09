import {getData} from './api.js';
import {showAlertMessage} from './modals.js';

let dataList = [];
export const writeData = (photos) => {dataList = photos;};
export const readData = () => dataList;

export const initData = (cbSuccess) => {
  getData(
    (photos) => {
      writeData(photos);

      if (cbSuccess) {cbSuccess(dataList);}
    },
    () => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};


