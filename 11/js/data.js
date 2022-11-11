import {getPhotos} from './api.js';
import { displayFilters } from './filters.js';
import { renderPhotos } from './gallery.js';
import {showAlertMessage} from './modals.js';

let dataList = [];

export const updateDataList = (photos) => {dataList = photos;};
export const getDataList = () => dataList;

const onError = () => showAlertMessage('Не удалось загрузить данные с сервера');

const onSuccess = (photos) => {
  updateDataList(photos);
  renderPhotos(dataList);
  displayFilters();
};

getPhotos(onSuccess, onError);

