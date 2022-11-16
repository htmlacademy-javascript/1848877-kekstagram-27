import {getPhotos} from './api.js';
import { displayFilters } from './filters.js';
import { renderPhotos } from './gallery.js';
import {showAlertMessage} from './modals.js';

let dataLists = [];

const updateDataList = (photos) => {dataLists = photos;};
export const getDataList = () => dataLists;

const getError = () => showAlertMessage('Не удалось загрузить данные с сервера');

const getSuccess = (photos) => {
  updateDataList(photos);
  renderPhotos(dataLists);
  displayFilters();
};

getPhotos(getSuccess, getError);

