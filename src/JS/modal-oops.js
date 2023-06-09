export function openModalOops() {
  const modalOops = document.querySelector('.modal-oops-backdrop');
  const modalOopsCloseBtn = document.querySelector('.modal-oops-close-btn');
  modalOops.style.display = 'flex';
  document.body.classList.add('modal-open');
  modalOopsCloseBtn.addEventListener('click', function () {
    modalOops.style.display = 'none';
    document.body.classList.remove('modal-open');
  });
  window.addEventListener('click', onOopsBackdropClick);
  function onOopsBackdropClick(event) {
    if (event.target == modalOops) {
      modalOops.style.display = 'none';
      window.removeEventListener('click', onEscPress, false);
      document.body.classList.remove('modal-open');
    }
  }
  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    const ESC_KEYCODE = 'Escape';
    if (event.code === ESC_KEYCODE) {
      modalOops.style.display = 'none';
      document.removeEventListener('keydown', onEscPress, false);
      document.body.classList.remove('modal-open');
    }
  }
}
