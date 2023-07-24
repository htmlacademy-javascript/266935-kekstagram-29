import { isEscape } from '../util.js';
import { unblockSubmitButton } from './uploadPictureForm.js';
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const closeErrorMessageElement = errorTemplateElement.querySelector('.error__button');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const closeSuccessMessageElement = successTemplateElement.querySelector('.success__button');

let errorMessage;
let successMessage;

const onCloseErrorMessage = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

function onCloseSuccessMessage (evt) {
  evt.preventDefault();
  closeSuccessMessage();
}

function onClickOutsideError (evt) {
  evt.preventDefault();
  if(evt.target !== document.querySelector('.error__inner')){
    closeErrorMessage();
  }
}

function onClickOutsideSuccess (evt) {
  evt.preventDefault();
  if(evt.target !== document.querySelector('.success__inner')){
    closeSuccessMessage();
  }
}

function closeSuccessMessage () {
  successMessage.remove();
  successMessage = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onClickOutsideSuccess);
  closeSuccessMessageElement.addEventListener('click', onCloseSuccessMessage);
}

function closeErrorMessage () {
  errorMessage.remove();
  errorMessage = '';
  unblockSubmitButton();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onClickOutsideError);
  closeErrorMessageElement.addEventListener('click', onCloseErrorMessage);
}

function onDocumentKeydown (evt) {
  if(isEscape(evt)){
    evt.preventDefault();
    if(successMessage){
      closeSuccessMessage();
    }else{
      closeErrorMessage();
    }
  }
}

const createErrorMessage = () => {
  errorMessage = errorTemplateElement.cloneNode(true);
  document.body.append(errorMessage);
  closeErrorMessageElement.addEventListener('click', onCloseErrorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onClickOutsideError);
};

const createSuccessMessage = () => {
  successMessage = successTemplateElement.cloneNode(true);
  document.body.append(successMessage);
  closeSuccessMessageElement.addEventListener('click', onCloseSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onClickOutsideSuccess);
};

export { createErrorMessage, createSuccessMessage };
