import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import { setFormAction } from './uploadPicture/uploadPictureForm.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((err) => {
    showAlert(err);
  });

setFormAction();
