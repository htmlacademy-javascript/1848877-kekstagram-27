const ALERT_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let activeDialog = null;

export const getActiveDialog = () => activeDialog;
const setActiveDialog = (element) => {activeDialog = element;};

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
function triggerOnEscHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeDialog(getActiveDialog());
  }
}

//Функция объявлена декларативно, чтобы могла быть вызвана раньше, чем она объявлена
function closeDialog (element) {
  element.remove();
  setActiveDialog(null);
  document.removeEventListener('keydown', triggerOnEscHandler);
};

export const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  const sectionError = document.querySelector('.error');
  setActiveDialog(sectionError);

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.getAttribute('data-dialog-close')) {
      closeDialog(sectionError);
    }
  });

  document.addEventListener('keydown', triggerOnEscHandler);
};

export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const sectionSuccess = document.querySelector('.success');
  setActiveDialog(sectionSuccess);

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.getAttribute('data-dialog-close')) {
      closeDialog(sectionSuccess);
    }
  });

  document.addEventListener('keydown', triggerOnEscHandler);
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


