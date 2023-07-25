import { isEscape } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = document.querySelector('.social__comments');
const commentsTemplateElement = document.querySelector('.social__comment');
const commentsCounterElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const bodyElement = document.querySelector('body');
const closeBigPictureButtonElement = document.querySelector('.big-picture__cancel');
const commentsAmount = parseInt(commentsCounterElement.textContent, 10);

const generateComments = (comments, loadCounter = 1) => {
  commentsListElement.innerHTML = '';
  let i = 0;
  for (i; i < (commentsAmount * loadCounter) && i < comments.length; i++){
    const commentItem = commentsTemplateElement.cloneNode(true);
    commentItem.querySelector('.social__picture').src = comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = comments[i].name;
    commentItem.querySelector('.social__text').textContent = comments[i].message;
    commentsListElement.append(commentItem);
  }
  document.querySelector('.social__comment-count').innerHTML = `${i} из <span class="comments-count">${comments.length}</span> комментариев`;
  if (i === comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }else {
    commentsLoaderElement.classList.remove('hidden');
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

const onCloseBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  closeBigPictureButtonElement.removeEventListener('click', onCloseBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onShowMoreClick);
};

function onDocumentKeydown (evt) {
  if(isEscape(evt)){
    evt.preventDefault();
    onCloseBigPicture();
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

  closeBigPictureButtonElement.addEventListener('click', onCloseBigPicture);

  document.addEventListener('keydown', onDocumentKeydown);

  onShowMoreClick = getShowMoreHandler(picture.comments);
  commentsLoaderElement.addEventListener('click', onShowMoreClick);
};

export { showBigPicture };
