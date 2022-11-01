const slider = document.querySelector('.effect-level__slider');
const containerEffects = document.querySelector('.effects__list');
const styles = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const imgUploadEffects = document.querySelector('.img-upload__effects');

let currentEffect;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

const gerHiddenSlider = () => {
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

export const resetSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const getEffectChange = (evt) => {
  currentEffect = evt.target.value;

  gerHiddenSlider();

  if (currentEffect === 'none' || currentEffect === 'chrome' || currentEffect === 'sepia') {
    resetSlider();
  }

  if (currentEffect === 'marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }

  if (currentEffect === 'phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

  if (currentEffect === 'heat') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};


const getHasClass = (element) => {

  if (element.classList.contains('effects__preview--chrome')) {
    element.classList.remove('effects__preview--chrome');
  }
  if (element.classList.contains('effects__preview--sepia')) {
    element.classList.remove('effects__preview--sepia');
  }
  if (element.classList.contains('effects__preview--marvin')) {
    element.classList.remove('effects__preview--marvin');
  }
  if (element.classList.contains('effects__preview--phobos')) {
    element.classList.remove('effects__preview--phobos');
  }
  if (element.classList.contains('effects__preview--heat')) {
    element.classList.remove('effects__preview--heat');
  }
};

containerEffects.addEventListener('click', (evt) => {
  const effectNone = evt.target.closest('#effect-none');
  const effectChrome = evt.target.closest('#effect-chrome');
  const effectSepia = evt.target.closest('#effect-sepia');
  const effectMarvin = evt.target.closest('#effect-marvin');
  const effectPhobos = evt.target.closest('#effect-phobos');
  const effectHeat = evt.target.closest('#effect-heat');

  if (effectChrome) {
    getHasClass(styles);
    styles.classList.add('effects__preview--chrome');

  }
  if (effectSepia) {
    getHasClass(styles);
    styles.classList.add('effects__preview--sepia');

  }
  if (effectMarvin){
    getHasClass(styles);
    styles.classList.add('effects__preview--marvin');

  }
  if (effectPhobos){
    getHasClass(styles);
    styles.classList.add('effects__preview--phobos');

  }
  if (effectHeat){
    getHasClass(styles);
    styles.classList.add('effects__preview--heat');

  }
  if (effectNone){
    getHasClass(styles);
    styles.classList.remove();

  }
});

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();

  if (currentEffect === 'none') {
    styles.style.filter = 'none';
  }

  if (currentEffect === 'chrome') {
    styles.style.filter = `grayscale(${effectValue.value})`;
  }

  if (currentEffect === 'sepia') {
    styles.style.filter = `sepia(${effectValue.value})`;
  }

  if (currentEffect === 'marvin') {
    styles.style.filter = `invert(${effectValue.value}%)`;
  }

  if (currentEffect === 'phobos') {
    styles.style.filter = `blur(${effectValue.value}px)`;
  }
  if (currentEffect === 'heat') {
    styles.style.filter = `brightness(${effectValue.value})`;
  }
});

export const getInitializationSlider = () => {
  currentEffect = 'none';

  gerHiddenSlider();
};

imgUploadEffects.addEventListener('change', getEffectChange);
