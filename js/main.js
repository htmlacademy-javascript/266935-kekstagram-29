import { renderThumbnails } from './thumbnail.js';
import { setFormAction } from './uploadPicture/uploadPictureForm.js';

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderThumbnails(photos);
  });

setFormAction();
