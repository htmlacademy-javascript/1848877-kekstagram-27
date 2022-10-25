import { hideBigPicture } from './miniatures.js';
import { closeOverlay } from './user-form.js';
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
const body = document.body;
const bigPictureSocial = document.querySelector('.big-picture__social');
const showComment = document.querySelector('.comments-shown');

const MAX_NUMBER_OF_COMMENTS = 5;

let commentsArray = [];

//обработчик закрытия по кнопке
export const onKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
    closeOverlay();
  }
};

//закрытие по кнопке
const onCancelButtonClick = () => {
  hideBigPicture();
};

closeButton.addEventListener('click', onCancelButtonClick); //обработчик закрытия по кнопке

//создание комментариев
const createComment = ({ avatar, name, message }) => {
  const socialComment = commentSocial.cloneNode(true);

  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;

  return socialComment;
};


export const renderPictureDialog = (picture) => {
  const commentFragment = document.createDocumentFragment();
  const { url, comments, likes, description } = picture;

  commentsArray = comments;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  comments.forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });

  socialComments.innerHTML = '';
  socialComments.appendChild(commentFragment);
};
// максимум показывается 5 комментариев
export const loadComments = () => {
  createComment(commentsArray.splice(0, MAX_NUMBER_OF_COMMENTS));
  showComment.textContent = socialComments.querySelectorAll('.social__comment').length;
  if (!commentsArray.length) {
    commentsLoader.classList.add('hidden');
  }
};

commentsLoader.addEventListener('click', loadComments);

