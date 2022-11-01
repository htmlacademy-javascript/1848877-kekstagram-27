const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;


const scaleSmall = document.querySelector('.scale__control--smaller');
const scaleBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let scale;

const scalePreview = () => {
  controlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
};

export const getDefaultValue = () => {
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

scaleSmall.addEventListener('click', zoomDown);
scaleBig.addEventListener('click', zoomIn);

