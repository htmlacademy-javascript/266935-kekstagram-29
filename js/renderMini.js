import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import { setFilterClick } from './filters.js';

const imgFilterElement = document.querySelector('.img-filters');

const renderMini = () =>{
  getData()
    .then((photos) => {
      imgFilterElement.classList.remove('img-filters--inactive');
      renderThumbnails(photos);
      setFilterClick(() => renderThumbnails(photos));
    })
    .catch((err) => {
      showAlert(err);
    });
};

export { renderMini };
