import {debounce, shuffle} from './util.js';
import {renderPhotos} from './gallery.js';
import { getDataList } from './data.js';

const QUANTITY_PICTURE_RANDOM = 10;

const filters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const imageFilters = document.querySelector('.img-filters');

let activeFilter = filterDefault;

export const displayFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const getCopyImagesArray = () => getDataList().slice();

const filterByRandom = (pictures) => {
  const pictureArrayCopy = pictures.slice();

  return shuffle(pictureArrayCopy).slice(0, QUANTITY_PICTURE_RANDOM);
};

const filterByDiscuss = (pictures) => pictures.slice().sort(
  (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length
);

imageFilters.addEventListener('click', debounce ((evt) => {
  activeFilter.classList.remove('img-filters__button--active');

  const filter = evt.target.id;
  activeFilter = evt.target;
  activeFilter.classList.add('img-filters__button--active');

  switch (filter) {
    case 'filter-default':
      renderPhotos(getCopyImagesArray());
      break;
    case 'filter-random':
      renderPhotos(filterByRandom(getCopyImagesArray()));
      break;
    case 'filter-discussed':
      renderPhotos(filterByDiscuss(getCopyImagesArray()));
      break;
  }
}));

