const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const controlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleContainer = document.querySelector('.img-upload__scale');
const decreaseScale = document.querySelector('.scale__control--smaller');
const increaseScale = document.querySelector('.scale__control--bigger');

let scale;

const scalePreview = () => {
  controlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
};

export const setDefaultValue = () => {
  scale = SCALE_MAX;
  scalePreview();
};

const zoomIn = () => {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
  }
  scalePreview();
};

const zoomDown = () => {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
  }
  scalePreview();
};

scaleContainer.addEventListener('click', (evt) => {
  switch (evt.target) {
    case decreaseScale:
      zoomDown();
      break;
    case increaseScale:
      zoomIn();
      break;
  }
});
