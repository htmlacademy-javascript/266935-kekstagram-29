import { isEscape } from '../util.js';
import { scaleBiggerHandler, scaleSmallerHandler, scaleBiggerHandlerRemove, scaleSmallerHandlerRemove, DefaultPreviewScaleHandler} from './changeScale.js';
import { addValidatorsPristine, validateFormPristine, resetValidatorsPristine } from './addValidators.js';
import './implementFilter.js';

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureElement = document.querySelector('.img-upload__input');
const editPictureFormElement = document.querySelector('.img-upload__overlay');
const closePictureFormElement = document.querySelector('.img-upload__cancel');

const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');

const onUploadPictureForm = (evt) => {
  evt.preventDefault();
  if (validateFormPristine()){
    const formData = new FormData(evt.target);
    fetch(
      'https://29.javascript.pages.academy/kekstagram ',
      {
        method: 'POST',
        body: formData,
      },
    ).then(onClosePictureForm)
      .catch((err) => {
        console.log(err);
      });
  }
};

const onUploadPictureChange = () => {
  editPictureFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectSliderContainerElement.classList.add('hidden');
  closePictureFormElement.addEventListener('click', onClosePictureForm);
  document.addEventListener('keydown', onDocumentKeydown);
  addValidatorsPristine();
  scaleBiggerHandler();
  scaleSmallerHandler();
};

function onClosePictureForm () {
  editPictureFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  DefaultPreviewScaleHandler();
  uploadImagePreviewElement.style.filter = '';
  uploadPictureElement.value = '';
  uploadPictureFormElement.removeEventListener('submit', onUploadPictureForm);
  scaleBiggerHandlerRemove();
  scaleSmallerHandlerRemove();
  resetValidatorsPristine();
}

function onDocumentKeydown (evt) {
  if(isEscape(evt) && !evt.target.closest('.img-upload__field-wrapper')){
    evt.preventDefault();
    onClosePictureForm();
  }
}

uploadPictureElement.addEventListener('change', onUploadPictureChange);
uploadPictureFormElement.addEventListener('submit', onUploadPictureForm);
