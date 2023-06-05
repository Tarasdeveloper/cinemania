const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const backdrop = document.querySelector('.backdrop');
const switchBt = document.querySelector('.switch');
const logo = document.querySelector('.header__nav-text');
const headerMenu = document.querySelector('.header__menu');
   

function toggleMenu () {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open-menu');
    
    toggleModal();
        
        
    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
};

openMenuBtn.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', closeMenu);

function closeMenu(evt) {
    console.log(evt)
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
    bodyScrollLock.enableBodyScroll(document.body);
  });


function toggleModal() {
    document.body.classList.toggle("is-open-menu");
    backdrop.classList.toggle('hidden-menu')
}
  
function changeColor() {
  if (!switchBt.classList.contains('day')) {
    return
  }
  mobileMenu.style.backgroundColor = '#F8F8F8';
  mobileMenu.style.color = '#111111';
  openMenuBtn.style.color = '#595959';
  logo.style.color = '#282828';
  backdrop.style.backgroundColor ='rgba(0, 0, 0, 0.2)'
  headerMenu.style.color = '#595959';
}