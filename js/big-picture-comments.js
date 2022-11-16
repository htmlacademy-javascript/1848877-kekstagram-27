const MAX_NUMBER_OF_COMMENT = 5;

const commentSocial = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const showComment = document.querySelector('.comments-shown');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

let visibleComments = [];
let displayedLength = 0;

const updateCommentState = () => {
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

const initiateComments = (comments) => {
  displayedLength = comments.length < MAX_NUMBER_OF_COMMENT ? comments.length
    : MAX_NUMBER_OF_COMMENT;

};

const renderComments = () => {
  const commentFragment = document.createDocumentFragment();

  ([...visibleComments].splice(0, displayedLength)).forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });

  socialComments.innerHTML = '';
  socialComments.appendChild(commentFragment);
};

export const renderPictureComments = ({comments}) => {
  visibleComments = comments;

  initiateComments(comments);
  renderComments();
  updateCommentState();
};


const showCommentsLoaderHandler = () => {
  const newState = displayedLength + MAX_NUMBER_OF_COMMENT;

  if (newState > visibleComments.length) {
    displayedLength = visibleComments.length;

    socialCommentsLoader.classList.add('hidden');
  } else {
    displayedLength = newState;
  }

  renderComments();
  updateCommentState();
};

socialCommentsLoader.addEventListener('click', showCommentsLoaderHandler);
