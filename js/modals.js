const ALERT_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

let activeDialog = null;

function triggerOnEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (activeDialog) {
      activeDialog.remove();
    }
    document.removeEventListener('keydown', triggerOnEsc);
  }
}

export const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  document.body.appendChild(errorFragment);

  const sectionError = document.querySelector('.error');
  activeDialog = sectionError;

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.getAttribute('data-dialog-close')) {
      sectionError.remove();
      document.removeEventListener('keydown', triggerOnEsc);
    }
  });

  document.addEventListener('keydown', triggerOnEsc);
};


export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(successMessage);
  document.body.appendChild(successFragment);

  const sectionSuccess = document.querySelector('.success');
  activeDialog = sectionSuccess;

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.getAttribute('data-dialog-close')) {
      sectionSuccess.remove();
      document.removeEventListener('keydown', triggerOnEsc);
    }
  });

  document.addEventListener('keydown', triggerOnEsc);
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
