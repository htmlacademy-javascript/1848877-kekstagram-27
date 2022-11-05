const slider = document.querySelector('.effect-level__slider');
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
  connect: 'lower'
});

const sliderHandler = () => {
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

export const resetEffect = () => {
  currentEffect = 'none';

  resetSlider();
};

const effectChangeHandler = (evt) => {
  styles.classList.remove(`effects__preview--${currentEffect}`);

  currentEffect = evt.target.value;

  styles.classList.add(`effects__preview--${currentEffect}`);

  sliderHandler();

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

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();

  switch(currentEffect) {
    case 'none':
      styles.style.filter = 'none';
      break;

    case 'chrome':
      styles.style.filter = `grayscale(${effectValue.value})`;
      break;

    case'sepia':
      styles.style.filter = `sepia(${effectValue.value})`;
      break;

    case'marvin':
      styles.style.filter = `invert(${effectValue.value}%)`;
      break;

    case'phobos':
      styles.style.filter = `blur(${effectValue.value}px)`;
      break;

    case'heat':
      styles.style.filter = `brightness(${effectValue.value})`;
      break;
  }
});

imgUploadEffects.addEventListener('change', effectChangeHandler);

export const sliderInit = () => {
  currentEffect = 'none';

  sliderHandler();
};
