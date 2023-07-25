import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert, debounce } from './util.js';
import { setFilterClick } from './filters.js';

const RENDER_DELAY = 500;

const imgFilterElement = document.querySelector('.img-filters');

const renderMini = () =>{
  getData()
    .then((photos) => {
      imgFilterElement.classList.remove('img-filters--inactive');
      renderThumbnails(photos);
      setFilterClick(debounce(
        () => renderThumbnails(photos),
        RENDER_DELAY));
    })
    .catch((err) => {
      showAlert(err);
    });
};

export { renderMini };
