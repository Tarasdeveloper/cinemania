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

switchDayBtn.addEventListener('click', ({ currentTarget }) => {
  if (removeBtn !== null) removeBtn.classList.toggle('day');
  if (addBtn !== null) addBtn.classList.toggle('day');
  if (globalSearchBtn !== null) globalSearchBtn.classList.toggle('day');
  currentTarget.classList.toggle('day');

  if (currentTarget.classList.contains('day')) {
    body.style.backgroundColor = '#FFFFFF';
  } else {
    body.style.backgroundColor = '#111111';
  }
});

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenWidthResizing(screenWidth);
});
