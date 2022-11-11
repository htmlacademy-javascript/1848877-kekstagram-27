const ALERT_SHOW_TIME = 5000;

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
    if (evt.target.closest('.error__button') || evt.target.closest('.error') && !evt.target.closest('.error__inner')) {
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
    if (evt.target.closest('.success__button') || evt.target.closest('.success') && !evt.target.closest('.success__inner')) {
      sectionSuccess.remove();
      document.removeEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, sectionSuccess));
    }
  });

  document.addEventListener('keydown', (keyEvt) => triggerOnEsc(keyEvt, sectionSuccess));
};

export const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
