const switchDayBtn = document.querySelector('button.switch');
const firstSvgLine = switchDayBtn.querySelector('.first');
const secondSvgLine = switchDayBtn.querySelector('.second');
const body = document.querySelector('body');
const removeBtn = document.querySelector('button.remove-btn');
const addBtn = document.querySelector('button.add-btn');
const globalSearchBtn = document.querySelector('.global-search-btn');
const modalWindow = document.querySelector('.modal-window');

let screenWidth = window.innerWidth;

const svgSwitcher = (el, add) => {
  if (add === true) {
    return el.classList.add('not-active');
  } else {
    return el.classList.remove('not-active');
  }
};

const svgSwitching = screenWidth => {
  if (screenWidth >= 768) {
    svgSwitcher(secondSvgLine, false);
    svgSwitcher(firstSvgLine, true);
  } else {
    svgSwitcher(firstSvgLine, false);
    svgSwitcher(secondSvgLine, true);
  }
};

svgSwitching(screenWidth);

switchDayBtn.addEventListener('click', ({ currentTarget }) => {
  if (removeBtn !== null) removeBtn.classList.toggle('day');
  if (addBtn !== null) addBtn.classList.toggle('day');
  if (globalSearchBtn !== null) globalSearchBtn.classList.toggle('day');
  if (modalWindow !== null) modalWindow.classList.toggle('day');
  currentTarget.classList.toggle('day');

  if (currentTarget.classList.contains('day')) {
    body.style.backgroundColor = '#FFFFFF';
  } else {
    body.style.backgroundColor = '#111111';
  }
});
window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  svgSwitching(screenWidth);
});
