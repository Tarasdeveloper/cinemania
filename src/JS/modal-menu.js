const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const backdrop = document.querySelector('.backdrop');
const switchBt = document.querySelector('.switch');
const logo = document.querySelector('.header__nav-text');
const headerMenu = document.querySelector('.header__menu');
  

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

openMenuBtn.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', closeMenu);



function toggleMenu () {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open-menu');
    
    toggleModal();      
};


function closeMenu(evt) {
    if (evt.target === mobileMenu || mobileMenu.contains(evt.target)) { 
        return }
    mobileMenu.classList.remove('is-open-menu');
    openMenuBtn.setAttribute('aria-expanded', false);
    toggleModal()
}


  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open-menu');
    openMenuBtn.setAttribute('aria-expanded', false);
  });


function toggleModal() {
    document.body.classList.toggle("is-open-menu");
    backdrop.classList.toggle('hidden-menu')
}
