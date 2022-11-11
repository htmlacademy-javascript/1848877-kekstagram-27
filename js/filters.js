import {debounce, getRandomUniqeElement} from './util.js';
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

const filterByRandom = (pictures) => {
  const pictureArrayCopy = [...pictures];

  return getRandomUniqeElement(pictureArrayCopy).slice(0, QUANTITY_PICTURE_RANDOM);
};

const filterByDiscuss = (pictures) => [...pictures].sort(
  (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length
);

imageFilters.addEventListener('click', debounce ((evt) => {
  activeFilter.classList.remove('img-filters__button--active');

  const filter = evt.target.id;
  activeFilter = evt.target;
  activeFilter.classList.add('img-filters__button--active');

  switch (filter) {
    case 'filter-default':
      renderPhotos([...getDataList()]);
      break;
    case 'filter-random':
      renderPhotos(filterByRandom([...getDataList()]));
      break;
    case 'filter-discussed':
      renderPhotos(filterByDiscuss([...getDataList()]));
      break;
  }
}));

