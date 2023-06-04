const switchDayBtn = document.querySelector('button.switch');
const removeBtn = document.querySelector('button.remove-btn');
const addBtn = document.querySelector('button.add-btn');
const body = document.querySelector('body');
const firstSvgLine = switchDayBtn.querySelector('.first');
const secondSvgLine = switchDayBtn.querySelector('.second');
const globalSearchBtn = document.querySelector('.global-search-btn');

let screenWidth = window.innerWidth;

const screenWidthResizing = screenWidth => {
  if (screenWidth >= 768) {
    secondSvgLine.classList.remove('not-active');
    firstSvgLine.classList.add('not-active');
  } else {
    secondSvgLine.classList.add('not-active');
    firstSvgLine.classList.remove('not-active');
  }
};

screenWidthResizing(screenWidth);

switchDayBtn.addEventListener('click', evt => {
  removeBtn.classList.toggle('day');
  addBtn.classList.toggle('day');
  globalSearchBtn.classList.toggle('day');
  evt.currentTarget.classList.toggle('day');

  if (removeBtn.classList.contains('day')) {
    body.style.backgroundColor = '#FFFFFF';
  } else {
    body.style.backgroundColor = '#111111';
  }
});

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenWidthResizing(screenWidth);
});
