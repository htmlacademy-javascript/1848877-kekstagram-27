const MAX_NUMBER_OF_COMMENTS = 5;

const commentSocial = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const showComment = document.querySelector('.comments-shown');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
//массив для комментариев
let visibleComments = [];
let displayedLength = 0;

export const updateCommentState = () => {
  showComment.textContent = displayedLength;
  commentsCount.textContent = visibleComments.length;

  if (displayedLength === visibleComments.length) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

const createComment = ({ avatar, name, message }) => {
  const socialComment = commentSocial.cloneNode(true);

  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;

  return socialComment;
};
//узнаем длину массива с комментариями
const initComments = (comments) => {
  visibleComments = comments;

  if (comments.length < MAX_NUMBER_OF_COMMENTS) {
    displayedLength = comments.length;
  } else {
    displayedLength = MAX_NUMBER_OF_COMMENTS;
  }
};

export const renderComments = () => {
  const commentFragment = document.createDocumentFragment();

  ([...visibleComments].splice(0, displayedLength)).forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });

  socialComments.innerHTML = '';
  socialComments.appendChild(commentFragment);
};

export const renderPictureComments = ({comments}) => {
  initComments(comments);
  renderComments();
  updateCommentState();
};


const getCommentsLoader = () => {
  const newState = displayedLength + MAX_NUMBER_OF_COMMENTS;

  if (newState > visibleComments.length) {
    displayedLength = visibleComments.length;

    socialCommentsLoader.classList.add('hidden');
  } else {
    displayedLength = newState;
  }

  renderComments();
  updateCommentState();
};
//оработчик кнопки "загрузить еще"
socialCommentsLoader.addEventListener('click', getCommentsLoader);
