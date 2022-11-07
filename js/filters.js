import {debounce, getRandomUniqeElement} from './util.js';
import {renderPhotos} from './miniatures.js';

const QUANTITY_PICTURE_RANDOM = 10;

const filters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDescussed = document.querySelector('#filter-discussed');
const imageFilters = document.querySelector('.img-filters');

const clearActiveClass = () => {
  const activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
};

const clearPhotoContainer = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

const createPicturesFilter = (pictures) => {
  clearPhotoContainer();
  renderPhotos(pictures);
};

const createDefaultPicture = (pictures) => [...pictures];

const createRandomPicture = (pictures) => {
  const pictureArrayCopy = [...pictures];

  return getRandomUniqeElement(pictureArrayCopy).slice(0, QUANTITY_PICTURE_RANDOM);
};

const compareCommentsNumber = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const createDiscussFilter = (picture) => [...picture].sort(compareCommentsNumber);

export const showFiltersContainer = (data) => {
  filters.classList.remove('img-filters--inactive');

  imageFilters.addEventListener('click', debounce ((evt) => {
    clearActiveClass();

    const filter = evt.target.id;

    switch (filter) {
      case 'filter-default':
        filterDefault.classList.add('img-filters__button--active');
        createPicturesFilter(createDefaultPicture([...data]));
        break;
      case 'filter-random':
        filterRandom.classList.add('img-filters__button--active');
        createPicturesFilter(createRandomPicture([...data]));
        break;
      case 'filter-discussed':
        filterDescussed.classList.add('img-filters__button--active');
        createPicturesFilter(createDiscussFilter([...data]));
        break;
    }
  })
  );};

