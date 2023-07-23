import { showBigPicture } from './bigPicture.js';
import { createRandomMassive } from './util.js';

const RANDOM_PICTURES_AMOUNT = 10;

const container = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const compareCommentsAmount = (pictureA, pictureB) => {
  const commentsAmountA = pictureA.comments.length;
  const commentsAmountB = pictureB.comments.length;
  return commentsAmountB - commentsAmountA;
};

const getRandomPicture = (pictures) => {
  const result = [];
  const numbers = createRandomMassive(0, pictures.length - 1, RANDOM_PICTURES_AMOUNT);
  numbers.forEach((number) => result.push(pictures[number]));
  return result;
};

const implementFilter = (pictures, filter) => {
  switch (filter){
    case 'filter-default':
      return pictures;

    case 'filter-random':
      return getRandomPicture(pictures);

    case 'filter-discussed':
      return pictures.slice().sort(compareCommentsAmount).slice(0,10);

  }
};

const renderThumbnails = (pictures) => {
  const filter = document.querySelector('.img-filters__button--active').id;
  const filteredPictures = implementFilter(pictures, filter);
  const fragment = document.createDocumentFragment();
  filteredPictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
    });
    fragment.append(thumbnail);
  });
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  container.append(fragment);
};

export { renderThumbnails };
