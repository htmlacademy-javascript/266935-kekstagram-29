import { isEscape } from '../util.js';
import { scaleBiggerHandler, scaleSmallerHandler, scaleBiggerHandlerRemove, scaleSmallerHandlerRemove, SetDefaultPreviewScaleHandler} from './changeScale.js';
import { addValidatorsPristine, validateFormPristine, resetValidatorsPristine, resetFields } from './addValidators.js';
import {effectChangeHandler, effectChangeHandlerRemove, resetEffects } from './implementFilter.js';
import { sendData } from '../api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureElement = document.querySelector('.img-upload__input');
const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');
const editPictureFormElement = document.querySelector('.img-upload__overlay');
const closePictureFormElement = document.querySelector('.img-upload__cancel');
const submitButtonElement = document.querySelector('.img-upload__submit');
const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const onUploadPictureForm = (evt) => {
  evt.preventDefault();
  addValidatorsPristine();
  if (validateFormPristine()){
    blockSubmitButton();
    resetValidatorsPristine();
    const formData = new FormData(evt.target);
    sendData(formData);
  }
};

const addImage = () => {
  const file = uploadPictureElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));
  if (matches){
    const fileURL = URL.createObjectURL(file);
    uploadImagePreviewElement.src = fileURL;
    effectPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileURL})`;
    });
  }
};

const onUploadPictureChange = () => {
  addImage();
  editPictureFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectSliderContainerElement.classList.add('hidden');
  effectChangeHandler(uploadImagePreviewElement);
  closePictureFormElement.addEventListener('click', onClosePictureForm);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadPictureFormElement.addEventListener('submit', onUploadPictureForm);
  scaleBiggerHandler();
  scaleSmallerHandler();
};

function onClosePictureForm () {
  resetFields();
  editPictureFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  SetDefaultPreviewScaleHandler();
  uploadPictureElement.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  closePictureFormElement.removeEventListener('click', onClosePictureForm);
  uploadPictureFormElement.removeEventListener('submit', onUploadPictureForm);
  resetEffects();
  effectChangeHandlerRemove();
  scaleBiggerHandlerRemove();
  scaleSmallerHandlerRemove();
}

function onDocumentKeydown (evt) {
  if(isEscape(evt) && !evt.target.closest('.img-upload__field-wrapper') &&
  !(document.body.querySelector('.error') || document.body.querySelector('.success'))){
    evt.preventDefault();
    onClosePictureForm();
  }
}

const setFormAction = () => uploadPictureElement.addEventListener('change', onUploadPictureChange);

export { setFormAction, unblockSubmitButton, onClosePictureForm};
