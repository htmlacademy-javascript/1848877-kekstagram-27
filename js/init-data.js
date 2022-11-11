import { initData } from './data.js';
import { renderPhotos } from './gallery.js';
import { displayFilters } from './filters.js';

initData((dataList)=> {
  renderPhotos(dataList);
  displayFilters();
});
