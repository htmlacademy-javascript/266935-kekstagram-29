const FILTERS_OPTIONS = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.10,
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
    effect: 'none',
    min: 0,
    max: 1,
    start: 0.50,
    step: 0.1,
    connect: 'lower',
  }
};

const effectSliderElement = document.querySelector('.effect-level__slider');

const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectValueELement = document.querySelector('.effect-level__value');
let pictureForFilters;

const effectsListElement = document.querySelector('.effects__list');


noUiSlider.create(effectSliderElement, {
  range: {
    min: FILTERS_OPTIONS.none.min,
    max: FILTERS_OPTIONS.none.max,
  },
  start: FILTERS_OPTIONS.none.start,
  step: FILTERS_OPTIONS.none.step,
  connect: FILTERS_OPTIONS.none.connect,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(2);
    },
    from: function (value) {
      return parseFloat(value).toFixed(2);
    },
  },
});

const onEffectChange = (evt) => {
  const filter = evt.target.value;
  const {effect, min, max, start, step, unit} = FILTERS_OPTIONS[filter];
  if (filter === 'none'){
    effectSliderElement.classList.add('hidden');
    effectSliderContainerElement.classList.add('hidden');
    pictureForFilters.style.filter = 'none';
    return;
  }else{
    effectSliderElement.classList.remove('hidden');
    effectSliderContainerElement.classList.remove('hidden');
  }
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
  effectSliderElement.noUiSlider.on('update', () => {
    if (effect !== 'none'){
      effectValueELement.value = effectSliderElement.noUiSlider.get();
      pictureForFilters.style.filter = `${effect}(${effectValueELement.value}${unit})`;
    }
  });
};

const resetEffects = () => {
  pictureForFilters.style.filter = '';
  effectsListElement.querySelector('#effect-none').checked = true;
};

const effectChangeHandlerRemove = () => effectsListElement.removeEventListener('change', onEffectChange);
const effectChangeHandler = (picture) => {
  pictureForFilters = picture;
  effectsListElement.addEventListener('change', onEffectChange);
};

export { effectChangeHandler, effectChangeHandlerRemove, resetEffects };


