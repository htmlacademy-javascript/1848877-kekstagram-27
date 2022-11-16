const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const controlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleContainer = document.querySelector('.img-upload__scale');
const decreaseScale = document.querySelector('.scale__control--smaller');
const increaseScale = document.querySelector('.scale__control--bigger');

let scale;

const scalePreview = (measure) => {
  controlValue.value = `${measure}%`;
  imgUploadPreview.style.transform = `scale(${measure / 100})`;
};

export const setDefaultValue = () => {
  scale = SCALE_MAX;
  scalePreview(scale);
};

const enhanceScale = () => {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
    scalePreview(scale);
  }
};

const reduceScale = () => {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
    scalePreview(scale);
  }
};

scaleContainer.addEventListener('click', (evt) => {
  switch (evt.target) {
    case decreaseScale:
      reduceScale();
      break;
    case increaseScale:
      enhanceScale();
      break;
  }
});
