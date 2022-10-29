const commentSocial = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const showComment = document.querySelector('.comments-shown');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

const MAX_NUMBER_OF_COMMENTS = 5;

let commentsArray = [];
let displayedLength = 0;

export const updateCommentState = () => {
  showComment.textContent = displayedLength;
  commentsCount.textContent = commentsArray.length;

  if (displayedLength === commentsArray.length) {
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

const initComments = (comments) => {
  commentsArray = comments;

  if (comments.length < MAX_NUMBER_OF_COMMENTS) {
    displayedLength = comments.length;
  } else {
    displayedLength = MAX_NUMBER_OF_COMMENTS;
  }
};

export const rerenderComments = () => {
  const commentFragment = document.createDocumentFragment();
  ([...commentsArray].splice(0, displayedLength)).forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });
  socialComments.innerHTML = '';
  socialComments.appendChild(commentFragment);
};

export const renderPictureComments = ({comments}) => {
  initComments(comments);
  rerenderComments();
  updateCommentState();
};

socialCommentsLoader.addEventListener('click', () => {
  const newState = displayedLength + MAX_NUMBER_OF_COMMENTS;
  if (newState > commentsArray.length) {
    displayedLength = commentsArray.length;
    socialCommentsLoader.classList.add('hidden');
  } else {
    displayedLength = newState;
  }

  rerenderComments();
  updateCommentState();
});
