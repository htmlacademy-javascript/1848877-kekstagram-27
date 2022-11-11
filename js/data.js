import {getData} from './api.js';
import {showAlertMessage} from './modals.js';

let updateDataList = [];

export const writeData = (photos) => {updateDataList = photos;};
export const getDataList = () => updateDataList;

export const initData = (cbSuccess) => {
  getData(
    (photos) => {
      writeData(photos);

      if (cbSuccess) {cbSuccess(updateDataList);}
    },
    () => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};


