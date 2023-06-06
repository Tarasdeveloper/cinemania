import API_key from './api_key';
import axios from 'axios';
export async function openModalPopUp(event) {
  const id = event;
  const data = await API(id);
  const code = await renderModal(data);
}
async function API(el) {
  const base = await axios.get(
    `https://api.themoviedb.org/3/movie/${el}?api_key=${API_key}`
  );
  return base.data;
}
function renderModal({
  poster_path,
  original_title,
  overview,
  popularity,
  genres,
  vote_average,
  vote_count,
}) {
  const modalPopUpBackdrop = document.querySelector('.modal-pop-up-backdrop');
  modalPopUpBackdrop.innerHTML = ' ';
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const vote_averageNew = vote_average.toFixed(1);
  const popularityNew = popularity.toFixed(1);
  let genresNew = '';
  for (const genre of genres) {
    genresNew += `${genre.name} `;
  }
  modalPopUpBackdrop.insertAdjacentHTML(
    'beforeend',
    `<div class="modal-window">
            <img class="modal-image" src="${poster}" alt="" />
            <div class="modal-content-wrapper">
                <h2 class="modal-title">${original_title}</h2>
                <ul class="modal-list">
                    <li class="modal-list-item">
                        <p class="modal-item-name">Vote / Votes</p>
                        <p class="modal-item-value">
                            <span class="modal-vote">${vote_averageNew}</span><span class="modal-item-slash">/</span>
                            <span class="modal-votes">${vote_count}</span>
                        </p>
                    </li>
                    <li class="modal-list-item">
                        <p class="modal-item-name">Popularity</p>
                        <p class="modal-item-value">${popularityNew}</p>
                    </li>
                    <li class="modal-list-item">
                        <p class="modal-item-name">Genre</p>
                        <p class="modal-item-value">${genresNew}</p>
                    </li>
                </ul>
                <h3 class="modal-about-title">About</h3>
                <p class="modal-about-description">
                    ${overview}
                </p>
                <button type="button" class="add-btn">Add to my library</button>
                <button type="button" class="modal-close-button">
                    <svg class="modal-close-icon">
                        <use href="/src/images/sprite.svg#icon-close"></use>
                    </svg>
                </button>
            </div>
        </div>`
  );
  const modalCloseBtn = document.querySelector('.modal-close-button');
  modalPopUpBackdrop.style.display = 'flex';
  modalCloseBtn.addEventListener('click', function () {
    modalPopUpBackdrop.style.display = 'none';
  });
  window.addEventListener('click', onPopUpBackdropClick);
  function onPopUpBackdropClick(event) {
    if (event.target == modalPopUpBackdrop) {
      modalPopUpBackdrop.style.display = 'none';
      window.removeEventListener('click', onEscPress, false);
    }
  }
  document.addEventListener('keydown', onEscPress);
  function onEscPress(event) {
    const ESC_KEYCODE = 'Escape';
    if (event.code === ESC_KEYCODE) {
      modalPopUpBackdrop.style.display = 'none';
      document.removeEventListener('keydown', onEscPress, false);
    }
  }
}
