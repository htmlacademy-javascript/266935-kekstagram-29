const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentCounter = document.querySelector('.social__comment-count').textContent;
const commentLoader = document.querySelector('.social__comments-loader');
const body = document.querySelector('body');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsAmount = parseInt(commentCounter, 10);

const generateComments = (comments, loadCounter = 1) => {
  commentsList.innerHTML = '';
  let i = 0;
  for (i; i < (commentsAmount * loadCounter) && i < comments.length; i++){
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = comments[i].name;
    commentItem.querySelector('.social__text').textContent = comments[i].message;
    commentsList.append(commentItem);
  }
  document.querySelector('.social__comment-count').innerHTML = `${i}
  из <span class="comments-count">${comments.length}</span> комментариев`;
  if (i === comments.length) {
    commentLoader.classList.add('hidden');
  }else {
    commentLoader.classList.remove('hidden');
  }
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    closeBigPicture();
  }
}

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  generateComments(picture.comments);

  bigPicture.querySelector('.social__caption').textContent = picture.description;

  body.classList.add('modal-open');

  closeBigPictureButton.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onDocumentKeydown);

  let counter = 1;
  commentLoader.addEventListener('click', () => {
    counter++;
    generateComments(picture.comments, counter);
  });

};

export { showBigPicture };
