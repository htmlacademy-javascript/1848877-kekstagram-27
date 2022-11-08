import {debounce, getRandomUniqeElement} from './util.js';
import {renderPhotos} from './miniatures.js';

const QUANTITY_PICTURE_RANDOM = 10;

const filters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDescussed = document.querySelector('#filter-discussed');
const imageFilters = document.querySelector('.img-filters');

let activeFilter = filterDefault;
let photoFromServer;

const clearActiveClass = () => {
  activeFilter.classList.remove('img-filters__button--active');
};

export const getPhotosFromServer = (photos) => {
  photoFromServer = [...photos];

  filters.classList.remove('img-filters--inactive');
};

const filterByDefault = (pictures) => pictures;

const filterByRandom = (pictures) => {
  const pictureArrayCopy = [...pictures];

  return getRandomUniqeElement(pictureArrayCopy).slice(0, QUANTITY_PICTURE_RANDOM);
};

const compareCommentsNumber = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const filterByDiscuss = (pictures) => [...pictures].sort(compareCommentsNumber);

imageFilters.addEventListener('click', debounce ((evt) => {
  clearActiveClass();

  const filter = evt.target.id;
  activeFilter = evt.target;

  switch (filter) {
    case 'filter-default':
      filterDefault.classList.add('img-filters__button--active');
      renderPhotos(filterByDefault(photoFromServer));
      break;
    case 'filter-random':
      filterRandom.classList.add('img-filters__button--active');
      renderPhotos(filterByRandom(photoFromServer));
      break;
    case 'filter-discussed':
      filterDescussed.classList.add('img-filters__button--active');
      renderPhotos(filterByDiscuss(photoFromServer));
      break;
  }
}));

