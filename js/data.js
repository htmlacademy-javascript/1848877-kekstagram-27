import {getPhotos} from './api.js';
import {showAlertMessage} from './modals.js';

let dataList = [];

export const updateDataList = (photos) => {dataList = photos;};
export const getDataList = () => dataList;

export const initData = (cbSuccess) => {
  getPhotos(
    (photos) => {
      updateDataList(photos);

      if (cbSuccess) {cbSuccess(dataList);}
    },
    () => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};


