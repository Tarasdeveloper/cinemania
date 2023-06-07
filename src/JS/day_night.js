const switchBt = document.querySelector('.switch');
  

window.addEventListener('DOMContentLoaded', () => {
  try {
    const isLightMode = localStorage.getItem('isLightMode');
    const parsedLightMode = isLightMode ? JSON.parse(isLightMode) : null;
    if (parsedLightMode !== null) {
      document.body.classList.toggle('is-light-mode', parsedLightMode.body);
      switchBt.classList.toggle('day', parsedLightMode.switchBtn);
    }
  } catch (err) {
    console.error("Set state error: ", error.message);
  }
});

switchBt.addEventListener('click', () => {
  document.body.classList.toggle('is-light-mode');
  const isLightMode = {
    body: document.body.classList.contains('is-light-mode'),
    switchBtn: switchBt.classList.contains('day'),
  }
  localStorage.setItem('isLightMode',JSON.stringify(isLightMode));
});