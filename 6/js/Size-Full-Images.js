const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const socialComments = document.querySelector('.social__comments');
const commentSocial = document.querySelector('.social__comment');
const socialCaption = document.querySelector('.social__caption');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

//обработчик закрытия по кнопке Esc
const onEscKeyDown = (evt) => {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    hideBigPicture();
  }
};

//функция, закрывающая окно
function hideBigPicture () {
  bigPicture.classList.add('hidden'); // добавляется класс, для скрывания окна
  body.classList.remove('modal-open'); // добавл-ся класс для активации скролла
  document.removeEventListener('keydown', onEscKeyDown); //удаления обработчика закрытия по Esc
}

//закрытие по кнопке
const onCancelButtonClick = () => {
  hideBigPicture();
};

closeButton.addEventListener('click', onCancelButtonClick); //обработчик закрытия по кнопке

//создание аватарок, лайков, комментариев
export const renderPictureDialog = (item) => {
  const fragment = document.createDocumentFragment();
  const {url, comments, likes, description} = item;

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  comments.forEach(({avatar, name, message}) => {
    const socialComment = commentSocial.cloneNode(true);

    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;

    fragment.appendChild(socialComment);
  });
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
};

//обработчик, срабатывающий при нажатии на фотографию, если есть класс .picture
export const onPhotoClick = (evt) => {
  const target = evt.target.closest('.pictures');

  if(!target) {
    hideBigPicture();
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};
//обработчик для вызова фотографии(удаление/добавление классов)
document.querySelector('.pictures').addEventListener('click', onPhotoClick);
