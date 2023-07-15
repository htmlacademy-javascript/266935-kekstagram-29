const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');

const generateComments = (comments) => {
  commentsList.innerHTML = '';

  for (let i = 0; i < comments.length; i++){
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = comments[i].name;
    commentItem.querySelector('.social__text').textContent = comments[i].message;
    commentsList.append(commentItem);
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  generateComments(picture.comments);

  bigPicture.querySelector('.social__caption').textContent = picture.description;

  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');

  body.classList.add('modal-open');

  closeBigPictureButton.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onDocumentKeydown);

};

export { showBigPicture };
