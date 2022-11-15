import {getPhotos} from './api.js';
import { displayFilters } from './filters.js';
import { renderPhotos } from './gallery.js';
import {showAlertMessage} from './modals.js';

let dataLists = [];

export const updateDataList = (photos) => {dataLists = photos;};
export const getDataList = () => dataLists;

const onError = () => showAlertMessage('Не удалось загрузить данные с сервера');

const onSuccess = (photos) => {
  updateDataList(photos);
  renderPhotos(dataLists);
  displayFilters();
};

getPhotos(onSuccess, onError);

