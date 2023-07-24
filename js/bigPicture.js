import { isEscape } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('.social__comment');
const commentCounterElement = document.querySelector('.social__comment-count').textContent;
const commentLoaderElement = document.querySelector('.social__comments-loader');
const bodyElement = document.querySelector('body');
const closeBigPictureButtonElement = document.querySelector('.big-picture__cancel');
const commentsAmount = parseInt(commentCounterElement, 10);

const generateComments = (comments, loadCounter = 1) => {
  commentsListElement.innerHTML = '';
  let i = 0;
  for (i; i < (commentsAmount * loadCounter) && i < comments.length; i++){
    const commentItem = commentTemplateElement.cloneNode(true);
    commentItem.querySelector('.social__picture').src = comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = comments[i].name;
    commentItem.querySelector('.social__text').textContent = comments[i].message;
    commentsListElement.append(commentItem);
  }
  document.querySelector('.social__comment-count').innerHTML = `${i} из <span class="comments-count">${comments.length}</span> комментариев`;
  if (i === comments.length) {
    commentLoaderElement.classList.add('hidden');
  }else {
    commentLoaderElement.classList.remove('hidden');
  }
};

let onShowMoreClick;

const getShowMoreHandler = (comments) => {
  let counter = 1;
  return () => {
    counter++;
    generateComments(comments, counter);
  };
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  closeBigPictureButtonElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoaderElement.removeEventListener('click', onShowMoreClick);
};

function onDocumentKeydown (evt) {
  if(isEscape(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
}

const showBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;

  generateComments(picture.comments);

  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  bodyElement.classList.add('modal-open');

  closeBigPictureButtonElement.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onDocumentKeydown);

  onShowMoreClick = getShowMoreHandler(picture.comments);
  commentLoaderElement.addEventListener('click', onShowMoreClick);
};

export { showBigPicture };
