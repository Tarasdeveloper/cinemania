import Pagination from 'tui-pagination';

const container = document.getElementById('tui-pagination-container');

const totalEl = 0;
const page = 1;

const options = {
  totalItems: totalEl,
  itemsPerPage: 12,
  visiblePages: 3,
  page: page,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// const pagination = new Pagination('pagination', options);
function createPagination() {
  const instance = new Pagination(paginationElem, options);

  return instance;
}
export default createPagination;
