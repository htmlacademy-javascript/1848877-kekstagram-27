import { initData } from './data.js';
import { renderPhotos } from './miniatures.js';
import { displayFilters } from './filters.js';

initData((dataList)=> {
  renderPhotos(dataList);
  displayFilters();
});
