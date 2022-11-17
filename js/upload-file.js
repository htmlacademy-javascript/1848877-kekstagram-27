const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgPreview = document.querySelector('.img-upload__preview img');

export const uploadFiles = (file) => {
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

