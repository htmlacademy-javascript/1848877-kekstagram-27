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

export const toggleModal = () => {
  if (bigPicture.classList.contains('hidden')){
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  } else {
    body.classList.remove('modal-open');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPicture.classList.add('hidden');
  }
};

export const photoClickHandler = (element) => {
  element.onclick = function (evt) {
    const target = evt.target.closest('.picture');
    if(!target){
      body.classList.remove('modal-open');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      bigPicture.classList.add('hidden');
    }
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  };
};

document.addEventListener('keydown', (evt)=> {
  if(evt.keyCode === 27){
    toggleModal();
  }
});
closeButton.addEventListener('click', ()=> {
  toggleModal();
});

export const enlargePhoto = (item) => {
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

