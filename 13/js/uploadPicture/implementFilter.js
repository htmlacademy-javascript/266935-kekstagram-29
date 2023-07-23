const FILTERS_OPTIONS = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
  none: {
    effect: '',
    min: 0,
    max: 1,
    start: 0.5,
    step: 0.1,
    connect: 'lower',
  }
};

const effectSliderElement = document.querySelector('.effect-level__slider');

const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectValueELement = document.querySelector('.effect-level__value');
const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');

const effectsListElement = document.querySelector('.effects__list');


noUiSlider.create(effectSliderElement, {
  range: {
    min: FILTERS_OPTIONS.none.min,
    max: FILTERS_OPTIONS.none.max,
  },
  start: FILTERS_OPTIONS.none.start,
  step: FILTERS_OPTIONS.none.step,
  connect: FILTERS_OPTIONS.none.connect,
});

const onEffectChange = (evt) => {
  const filter = evt.target.value;
  if (filter === 'none'){
    effectSliderElement.classList.add('hidden');
    effectSliderContainerElement.classList.add('hidden');
  }else{
    effectSliderElement.classList.remove('hidden');
    effectSliderContainerElement.classList.remove('hidden');
  }
  const {effect, min, max, start, step, unit} = FILTERS_OPTIONS[filter];
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
  effectSliderElement.noUiSlider.on('update', () => {
    effectValueELement.value = effectSliderElement.noUiSlider.get();
    uploadImagePreviewElement.style.filter = `${effect}(${effectValueELement.value}${unit})`;
  });
};

const resetEffects = () => {
  uploadImagePreviewElement.style.filter = '';
  effectsListElement.querySelector('#effect-none').checked = true;
};

const effectChangeHandlerRemove = () => effectsListElement.removeEventListener('change', onEffectChange);
const effectChangeHandler = () => effectsListElement.addEventListener('change', onEffectChange);

export { effectChangeHandler, effectChangeHandlerRemove, resetEffects };


