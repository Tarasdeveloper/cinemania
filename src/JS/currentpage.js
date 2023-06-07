document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = window.location.pathname;
  const navigationLinks = document.querySelectorAll('.navigation a');

  for (let link of navigationLinks) {
    const href = link.getAttribute('href');

    if (href === currentLocation) {
      link.classList.add('current');
    }
  }
});

const scrollUpButton = document.getElementById('scrollUpButton');

// Показывать кнопку, когда прокручено больше половины экрана
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight / 2) {
    scrollUpButton.style.display = 'block';
  } else {
    scrollUpButton.style.display = 'none';
  }
});

// При клике на кнопку прокрутить страницу вверх
scrollUpButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
