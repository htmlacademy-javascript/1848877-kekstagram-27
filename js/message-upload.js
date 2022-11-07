import {keyDownHandler} from './user-form.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

let keyDownErrorListener;
let keyDownSuccessListener;

export const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  document.body.appendChild(errorFragment);
  const sectionError = document.querySelector('.error');
  document.removeEventListener('keydown', keyDownHandler);

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.error__button') || evt.target.closest('.error')) {
      sectionError.remove();
      document.addEventListener('keydown', keyDownHandler);
      document.removeEventListener('keydown', keyDownErrorListener);
    }
  });

  const KeyDownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      sectionError.remove();
      document.addEventListener('keydown', keyDownHandler);
    }
  };

  keyDownErrorListener = KeyDownEscHandler;

  document.addEventListener('keydown', keyDownErrorListener);
};


export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(successMessage);
  document.body.appendChild(successFragment);
  const sectionSuccess = document.querySelector('.success');

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.success__button') || evt.target.closest('.success')) {
      sectionSuccess.remove();
      document.removeEventListener('keydown', keyDownSuccessListener);
    }
  });

  const KeyDownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      sectionSuccess.remove();
    }
  };

  keyDownSuccessListener = KeyDownEscHandler;

  document.addEventListener('keydown', keyDownSuccessListener);
};


