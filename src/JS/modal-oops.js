export function openModalOops() {
  const modalOops = document.querySelector('.modal-oops-backdrop');
  const modalOopsCloseBtn = document.querySelector('.modal-oops-close-btn');
  modalOops.style.display = 'flex';
  modalOopsCloseBtn.addEventListener('click', function () {
    modalOops.style.display = 'none';
  });
  window.addEventListener('click', onOopsBackdropClick )
    function onOopsBackdropClick(event) {
    if (event.target == modalOops) {
      modalOops.style.display = 'none';
      window.removeEventListener('click', onEscPress, false)
    }
  };
  document.addEventListener('keydown', onEscPress)
    function onEscPress(event) {
      const ESC_KEYCODE = 'Escape';
      if (event.code === ESC_KEYCODE) {
        modalOops.style.display = 'none';
        document.removeEventListener('keydown', onEscPress, false)
      }
    };
}
