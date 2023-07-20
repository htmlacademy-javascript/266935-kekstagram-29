import { isEscape } from '../util.js';
import './changeScale.js';
import './implementFilter.js';


const HASTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_AMOUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const DESCRIPTION_MAXLENGTH_ERROR = 'Не более 140 символов';
const MAXCOUNT_HASHTAGS_ERROR = 'Не более 5 хэштэгов';
const SIMILAR_HASHTAGS_ERROR = 'Хэштеги не могут повторяться';
const CORRECT_HASHTAG_ERROR = 'Хэш-тег должен начинается с символа # и не может содержать спецсимволы. Максимальная длина хэш-тега 20 символов, включая решётку.Хэштеги должны разделяться пробелом.';

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureElement = document.querySelector('.img-upload__input');
const editPictureFormElement = document.querySelector('.img-upload__overlay');
const closePictureFormElement = document.querySelector('.img-upload__cancel');
const hashtagsElement = document.querySelector('.text__hashtags');
const commentsElement = document.querySelector('.text__description');

const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');

const validateForm = new Pristine(uploadPictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagsAmount = (value) => {
  const hashtags = value.trim().split(' ');
  if (hashtags.length > HASHTAG_MAX_AMOUNT){
    return false;
  }
  return true;
};

const validateHashtagSimbols = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; i++){
    if (!HASTAG_REGEXP.test(hashtags[i])){
      return false;
    }
  }
  return true;
};

const validateHashtagsRepeat = (value) => {
  const hashtags = value.trim().split(' ');
  for(let i = 0; i < hashtags.length - 1; i++){
    for (let j = i + 1; j < hashtags.length; j++){
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()){
        return false;
      }
    }
  }
  return true;
};

const validateComments = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

validateForm.addValidator(hashtagsElement, validateHashtagSimbols, CORRECT_HASHTAG_ERROR);
validateForm.addValidator(hashtagsElement, validateHashtagsAmount, MAXCOUNT_HASHTAGS_ERROR);
validateForm.addValidator(hashtagsElement, validateHashtagsRepeat, SIMILAR_HASHTAGS_ERROR);
validateForm.addValidator(commentsElement, validateComments, DESCRIPTION_MAXLENGTH_ERROR);

uploadPictureFormElement.addEventListener('submit', (evt) => {
  if (!validateForm.validate()){
    evt.preventDefault();
  }
});

const onUploadPictureChange = () => {
  editPictureFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectSliderContainerElement.classList.add('hidden');
};

const onClosePictureForm = () => {
  editPictureFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImagePreviewElement.style.transform = 'scale(1)';
  uploadImagePreviewElement.style.filter = '';
  uploadPictureElement.value = '';
};

function onDocumentKeydown (evt) {
  if(isEscape(evt) && !evt.target.closest('.img-upload__field-wrapper')){
    evt.preventDefault();
    onClosePictureForm();
  }
}

uploadPictureElement.addEventListener('change', onUploadPictureChange);
closePictureFormElement.addEventListener('click', onClosePictureForm);
document.addEventListener('keydown', onDocumentKeydown);


