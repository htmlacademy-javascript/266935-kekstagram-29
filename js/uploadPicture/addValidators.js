const HASTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_AMOUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const DESCRIPTION_MAXLENGTH_ERROR = 'Не более 140 символов';
const MAXCOUNT_HASHTAGS_ERROR = 'Не более 5 хэштэгов';
const SIMILAR_HASHTAGS_ERROR = 'Хэштеги не могут повторяться';
const CORRECT_HASHTAG_ERROR = 'Хэш-тег должен начинается с символа # и не может содержать спецсимволы. Максимальная длина хэш-тега 20 символов, включая решётку.Хэштеги должны разделяться пробелом.';

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = document.querySelector('.text__hashtags');
const commentsElement = document.querySelector('.text__description');

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

let validateForm;

const addValidatorsPristine = () => {
  validateForm = new Pristine(uploadPictureFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });
  validateForm.addValidator(hashtagsElement, validateHashtagSimbols, CORRECT_HASHTAG_ERROR);
  validateForm.addValidator(hashtagsElement, validateHashtagsAmount, MAXCOUNT_HASHTAGS_ERROR);
  validateForm.addValidator(hashtagsElement, validateHashtagsRepeat, SIMILAR_HASHTAGS_ERROR);
  validateForm.addValidator(commentsElement, validateComments, DESCRIPTION_MAXLENGTH_ERROR);
};

const validateFormPristine = () => validateForm.validate();
const resetValidatorsPristine = () => {
  validateForm.reset();
  validateForm.destroy();
};
const resetFields = () => {
  hashtagsElement.value = '';
  commentsElement.value = '';
};

export { addValidatorsPristine, validateFormPristine, resetValidatorsPristine, resetFields};
