const MAX_SCALE = '100%';
const MIN_SCALE = '25%';
const STEP_SCALE = '25%';

const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');

const changeSize = (percentSize) => {
  scaleValueElement.value = `${percentSize}%`;
  const size = percentSize / 100;
  uploadImagePreviewElement.style.transform = `scale(${size})`;
};

const onSmallerScale = () => {
  if (scaleValueElement.value !== MIN_SCALE){
    const percentSize = parseInt(scaleValueElement.value, 10) - parseInt(STEP_SCALE, 10);
    changeSize(percentSize);
  }
};

const onBiggerScale = () => {
  if (scaleValueElement.value !== MAX_SCALE){
    const percentSize = parseInt(scaleValueElement.value, 10) + parseInt(STEP_SCALE, 10);
    changeSize(percentSize);
  }
};

const DefaultPreviewScaleHandler = () => {
  uploadImagePreviewElement.style.transform = 'scale(1)';
};

const scaleSmallerHandler = () => scaleSmallerElement.addEventListener('click', onSmallerScale);
const scaleSmallerHandlerRemove = () => scaleSmallerElement.removeEventListener('click', onSmallerScale);
const scaleBiggerHandler = () => scaleBiggerElement.addEventListener('click', onBiggerScale);
const scaleBiggerHandlerRemove = () => scaleBiggerElement.removeEventListener('click', onBiggerScale);


export { scaleBiggerHandler, scaleSmallerHandler, scaleSmallerHandlerRemove, scaleBiggerHandlerRemove, DefaultPreviewScaleHandler};
