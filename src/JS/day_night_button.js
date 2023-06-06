const switchDayBtn = document.querySelector('button.switch');
const firstSvgLine = switchDayBtn.querySelector('.first');
const secondSvgLine = switchDayBtn.querySelector('.second');

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

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  svgSwitching(screenWidth);
});