const refs = {
  openModal: document.querySelector('.open-modal-team'),
  closeModal: document.querySelector('.close-modal-team'),
  teamBackdrop: document.querySelector('.backdrop-modal'),
  teamModal: document.getElementsByClassName('team__modal'),
  teamPhotos: document.querySelectorAll('.team__photo'), 
  teamNames: document.querySelectorAll('.team__name')
};

if (refs.openModal) refs.openModal.addEventListener('click', openModalTeam);
if (refs.closeModal) refs.closeModal.addEventListener('click', closeModalTeam);


refs.teamPhotos.forEach(photo => {
  photo.addEventListener('mouseenter', handlePhotoHover);
  photo.addEventListener('mouseleave', handlePhotoHover);
});


refs.teamNames.forEach(name => {
  name.addEventListener('mouseenter', handleNameHover);
  name.addEventListener('mouseleave', handleNameHover);
});

function openModalTeam(event) {
  refs.teamBackdrop.classList.remove('team__backdrop--hidden');
  document.addEventListener('keydown', onEscapeClose);
  document.addEventListener('click', onBackdropClose);
  refs.teamModal[0].classList.add('openModalAnimationTeam');
  document.body.style.overflow = 'hidden';
}

function closeModalTeam(event) {
  refs.teamModal[0].classList.remove('closeModalAnimationTeam');
  refs.teamBackdrop.classList.add('team__backdrop--hidden');
  document.removeEventListener('keydown', onEscapeClose);
  document.body.style.overflow = '';
}

function onEscapeClose(event) {
  if (event.code === 'Escape') {
    closeModalTeam();
  }
}

function onBackdropClose(event) {
  if (event.target === refs.teamBackdrop) {
    closeModalTeam();
  }
}

function handlePhotoHover(event) {
  const member = event.target.closest('.team__member');
  const name = member.querySelector('.team__name');
  name.classList.toggle('hovered');
}

function handleNameHover(event) {
  const member = event.target.closest('.team__member');
  const photo = member.querySelector('.team__photo');
  photo.classList.toggle('hovered');
}
