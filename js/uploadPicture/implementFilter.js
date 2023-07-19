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
  default: {
    min: 0,
    max: 1,
    start: 0.5,
    step: 0.1,
    connect: 'lower',
  }
};

const effectSliderElement = document.querySelector('.effect-level__slider');
const effectValueELement = document.querySelector('.effect-level__value');
const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
//const imgUploadEffectElement = document.querySelector('.img-upload__effect-level');

noUiSlider.create(effectSliderElement, {
  range: {
    min: FILTERS_OPTIONS.default.min,
    max: FILTERS_OPTIONS.default.max,
  },
  start: FILTERS_OPTIONS.default.start,
  step: FILTERS_OPTIONS.default.step,
  connect: FILTERS_OPTIONS.default.connect,
});

const fillEffectValue = (effect, unit) => {
  uploadImagePreviewElement.style.filter = `${effect}(${effectValueELement.value}${unit})`;
};

effectSliderElement.noUiSlider.on('update', () => {
  effectValueELement.value = effectSliderElement.noUiSlider.get();
});


effectsListElement.addEventListener('change', (evt) => {
  const filter = evt.target.value;
  const {effect, min, max, start, step, unit} = FILTERS_OPTIONS[filter];
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
  fillEffectValue(effect, unit);
});

//console.log(effectSliderElement.noUiSlider.get);

// effectSliderElement.noUiSlider.on('update', () => {

// });


// const insertValueFromSlider = (effect, unit) => {
//   effectSliderElement.noUiSlider.on('update', () => {
//     effectValueELement.value = effectSliderElement.noUiSlider.get();
//     uploadImagePreviewElement.style.filter = `${effect}(${effectValueELement.value}${unit})`;
//   });
// };

// const createSliderUpdateOptions = (value) => {
//   const {effect, min, max, start, step, unit} = SLIDER_OPTIONS[value];
//   effectSliderElement.noUiSlider.updateOptions ({
//     range: {
//       min: min,
//       max: max,
//     },
//     start: start,
//     step: step,
//   });
//   insertValueFromSlider(effect, unit);
// };

// const setSliderState = (value) => {
//   if(value === 'none'){
//     imgUploadEffectElement.classList.add('hidden');
//     uploadImagePreviewElement.style.filter = '';
//     return;
//   }
//   imgUploadEffectElement.classList.remove('hidden');
//   createSliderUpdateOptions(value);
// };

// const onEffectListChange = (evt) => {
//   setSliderState(evt.target.value);
// };

// const createFilters = () => {
//   createSlider();
//   effectsListElement.addEventListener('change', onEffectListChange);
// };

// export { createFilters };
