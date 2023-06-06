const refs = {
    openModal: document.querySelector('.open-modal-team'),
    closeModal: document.querySelector('.close-modal-team'),
    teamBackdrop: document.querySelector('.backdrop-modal'),
    teamModal: document.getElementsByClassName('team__modal'),
  };
  if (refs.openModal) refs.openModal.addEventListener('click', openModalTeam);
  if (refs.closeModal) refs.closeModal.addEventListener('click', closeModalTeam); 
  function openModalTeam(event) {
    refs.teamBackdrop.classList.remove('team__backdrop--hidden');
    document.addEventListener('keydown', onEscapeClose);
    document.addEventListener('click', onBackdropClose);
    refs.teamModal[0].classList.add('openModalAnimationTeam');
  }
  function closeModalTeam(event) {
    refs.teamModal[0].classList.remove('closeModalAnimationTeam');
    refs.teamBackdrop.classList.add('team__backdrop--hidden');
    document.removeEventListener('keydown', onEscapeClose);
    document.body.style.overflow = '';
  } 
  function onEscapeClose(event) {
    if (event.code === 'Escape') {
      refs.teamModal[0].classList.remove('openModalAnimationTeam');
      refs.teamModal[0].classList.add('closeModalAnimationTeam');
      setTimeout(() => {
        closeModalTeam();
      }, 400);
      closeModalTeam();
    }
  }
  function onBackdropClose(event) {
    if (event.target === refs.teamBackdrop) {
      refs.teamModal[0].classList.remove('openModalAnimationTeam');
      refs.teamModal[0].classList.add('closeModalAnimationTeam');
      setTimeout(() => {
        closeModalTeam();
      }, 400);
    }
  }