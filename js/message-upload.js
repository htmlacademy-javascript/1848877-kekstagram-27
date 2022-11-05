const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();
const body = document.body;

export const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  body.appendChild(errorFragment);
  const sectionError = document.querySelector('.error');

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.error__button')) {
      sectionError.remove();
    }
    if (evt.target.closest('.error')) {
      sectionError.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      sectionError.remove();
    }
  });
};

export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(successMessage);
  body.appendChild(successFragment);
  const sectionSuccess = document.querySelector('.success');

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.success__button')) {
      sectionSuccess.remove();
    }
    if (evt.target.closest('.success')) {
      sectionSuccess.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      sectionSuccess.remove();
    }
  });
};

