import {debounce, shuffle} from './util.js';
import {renderPhotos} from './gallery.js';
import { getDataList } from './data.js';

const QUANTITY_PICTURE_RANDOM = 10;

const filterDefault = document.querySelector('#filter-default');
const imageFilters = document.querySelector('.img-filters');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

let activeFilter = filterDefault;

export const displayFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');
};

const filterByRandom = (pictures) => shuffle([...pictures]).slice(0, QUANTITY_PICTURE_RANDOM);

const filterByDiscuss = (pictures) =>
  [...pictures]
    .sort(
      (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length
    );

const filterChangeHandler = debounce ((evt) => {
  const filter = evt.target.closest('.img-filters__button');

  if(filter && (filter === filterRandom || activeFilter !== filter)) {
    activeFilter.classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
    activeFilter = filter;

    switch (filter) {
      case filterDefault:
        renderPhotos(getDataList());
        break;
      case filterRandom:
        renderPhotos(filterByRandom(getDataList()));
        break;
      case filterDiscussed:
        renderPhotos(filterByDiscuss(getDataList()));
        break;
    }
  }
});

imageFilters.addEventListener('click', filterChangeHandler);
