export function openModalOopsDetails() {
  const modalOopsDetails = document.querySelector('.modal-oops-details-backdrop');
  const modalOopsDetailsCloseBtn = document.querySelector(
    '.modal-oops-details-close-btn'
  );
  modalOopsDetails.style.display = 'flex';
  document.body.classList.add('modal-open');
  modalOopsDetailsCloseBtn.addEventListener('click', function () {
    modalOopsDetails.style.display = 'none';
    document.body.classList.remove('modal-open');
  });
  window.addEventListener('click', onOopsDetailsBackdropClick);
  function onOopsDetailsBackdropClick(event) {
    if (event.target == modalOopsDetails) {
      modalOopsDetails.style.display = 'none';
      window.removeEventListener('click', onEscPress, false);
      document.body.classList.remove('modal-open');
    }
  }
  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    const ESC_KEYCODE = 'Escape';
    if (event.code === ESC_KEYCODE) {
      modalOopsDetails.style.display = 'none';
      document.removeEventListener('keydown', onEscPress, false);
      document.body.classList.remove('modal-open');
    }
  }
}
