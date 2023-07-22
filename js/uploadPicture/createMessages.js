import { isEscape } from '../util.js';
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
let errorMessage;
let successMessage;


const closeSuccessMessage = () => {
  successMessage.remove();
  successMessage = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeErrorMessage = () => {
  errorMessage.remove();
  errorMessage = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseErrorMessage = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

const onCloseSuccessMessage = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

const onClickOutsideError = (evt) => {
  if(evt.target !== errorTemplateElement){
    closeErrorMessage();
  }
};

const onClickOutsideSuccess = (evt) => {
  if(evt.target !== successTemplateElement){
    closeSuccessMessage();
  }
};

const createErrorMessage = () => {
  errorMessage = errorTemplateElement.cloneNode(true);
  document.body.append(errorMessage);
  errorMessage.querySelector('.error__button').addEventListener('click', onCloseErrorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onClickOutsideError);
};

const createSuccessMessage = () => {
  successMessage = successTemplateElement.cloneNode(true);
  document.body.append(successMessage);
  successMessage.querySelector('.success__button').addEventListener('click', onCloseSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onClickOutsideSuccess);
};

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

export { createErrorMessage, createSuccessMessage };
