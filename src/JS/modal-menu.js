const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const backdrop = document.querySelector('.backdrop');
const switchBt = document.querySelector('.switch');
const logo = document.querySelector('.header__nav-text');
const headerMenu = document.querySelector('.header__menu');

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
    return
  }
  
    mobileMenu.classList.remove('is-open-menu');
    openMenuBtn.setAttribute('aria-expanded', false);
    toggleModal()
}


  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open-menu');
    openMenuBtn.setAttribute('aria-expanded', false);
    document.body.classList.remove('is-open-menu');
    if (!mobileMenu.classList.contains('is-open-menu')) {
    backdrop.classList.add('hidden-menu');
    }
  });


function toggleModal() {
    document.body.classList.toggle("is-open-menu");
    backdrop.classList.toggle('hidden-menu')
}
