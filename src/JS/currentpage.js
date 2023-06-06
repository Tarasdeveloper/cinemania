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
