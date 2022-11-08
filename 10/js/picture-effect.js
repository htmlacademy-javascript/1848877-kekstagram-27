const slider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview');
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

const hideSlider = () => {
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

const changeEffectImageHandler = (evt) => {
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);

  currentEffect = evt.target.value;

  imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  switch (currentEffect) {
    case 'none':
    case'chrome':
    case 'sepia':
      resetSlider();
      break;

    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;

    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
};

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();

  switch(currentEffect) {
    case 'none':
      imgUploadPreview.style.filter = 'none';
      break;

    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${effectValue.value})`;
      break;

    case'sepia':
      imgUploadPreview.style.filter = `sepia(${effectValue.value})`;
      break;

    case'marvin':
      imgUploadPreview.style.filter = `invert(${effectValue.value}%)`;
      break;

    case'phobos':
      imgUploadPreview.style.filter = `blur(${effectValue.value}px)`;
      break;

    case'heat':
      imgUploadPreview.style.filter = `brightness(${effectValue.value})`;
      break;
  }
});

imgUploadEffects.addEventListener('change', changeEffectImageHandler);

export const resetSliderInit = () => {
  currentEffect = 'none';

  hideSlider();
};
