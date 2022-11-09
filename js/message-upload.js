const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

const triggerOnEsc = (evt, element) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (element) {
      element.remove();
    }
    document.removeEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, element));
  }
};

export const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  document.body.appendChild(errorFragment);

  const sectionError = document.querySelector('.error');

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.error__button') || evt.target.closest('.error')) {
      sectionError.remove();
      document.removeEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, sectionError));
    }
  });

  document.addEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, sectionError));
};


export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(successMessage);
  document.body.appendChild(successFragment);

  const sectionSuccess = document.querySelector('.success');

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.success__button') || evt.target.closest('.success')) {
      sectionSuccess.remove();
      document.removeEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, sectionSuccess));
    }
  });

  document.addEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, sectionSuccess));
};


