import API_key from './api_key';
import axios from 'axios';
import img from '../images/coming_soon_default.jpg';
const url = window.location.href;
export async function openModalPopUp(event) {
  const id = event;
  const data = await API(id);
  const code = await renderModal(data);
  console.log(id);
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
  id,
}) {
  const modalPopUpBackdrop = document.querySelector('.modal-pop-up-backdrop');
  modalPopUpBackdrop.innerHTML = ' ';
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : img;
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
                <button type="button" class="add-btn"  id="add">Add to my library </button>   
                <button type="button" class="add-btn hidden" id="remove">Remove from my library</button>
                <button type="button" class="modal-close-button">
                <svg class="modal-close-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 17.25 6.75 6.75m10.5 0-10.5 10.5"/>
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
  //
  const addBtn = document.querySelector('#add');
  const removeBtn = document.querySelector('#remove');
  function getAddedMovies() {
    return JSON.parse(localStorage.getItem('addedMovies'));
  }
  function setAddedMovies(arr) {
    localStorage.setItem('addedMovies', JSON.stringify(arr));
  }
  // if (url.includes('library')) {
  //   addBtn.classList.add('hidden');
  //   removeBtn.classList.remove('hidden');
  // }
  let existing = getAddedMovies();
  existing = existing ? existing : [];
  if (existing.includes(id)) {
    addBtn.classList.add('hidden');
    removeBtn.classList.remove('hidden');
  }

  addBtn.addEventListener('click', onClickAdd);
  removeBtn.addEventListener('click', onClickRemove);
  function onClickAdd() {
    let existing = getAddedMovies();
    existing = existing ? existing : [];

    if (url.includes('library')) {
      addBtn.classList.remove('hidden');
      removeBtn.classList.add('hidden');
    }

    if (existing.includes(id)) {
      addBtn.classList.add('hidden');
      removeBtn.classList.remove('hidden');
      return;
    }

    existing.push(id);
    setAddedMovies(existing);

    addBtn.classList.add('hidden');
    removeBtn.classList.remove('hidden');
    async function getInfoMovie(movie_id) {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`;
      return await axios
        .get(url)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          const instance = basicLightbox.create(`
		<div class="notification-trailer-fail">
		 
    	<p class="notification-trailer-fail-text">OOPS...<br/> We are very sorry!<br /> There is no info of this film</p>
        <div class="bg-box"></div>
</div>

`);

          instance.show();
        });
    }
    if (url.includes('library')) {
      getInfoMovie(id).then(film => {
        myLibGallery.insertAdjacentHTML('beforeEnd', makeCard(film));
      });
    }
  }
  function removeFromPage(id) {
    const el = document.querySelector(`[data-id="${id}"]`);

    if (el.parentElement.className === 'mylib-gallery__list catalog') {
      el.remove();
    } else {
      el.remove();
    }
  }
  function isId(el) {
    return el === id
  }
  function onClickRemove() {
    let existing = getAddedMovies();
    existing = existing ? existing : [];
    if (existing.includes(id)) {
      let index = existing.findIndex(isId);
        console.log(index)

      existing.splice(index, 1);
      setAddedMovies(existing);
      addBtn.classList.remove('hidden');
      removeBtn.classList.add('hidden');
    }

    if (url.includes('library')) {
      const libraryFilms = getAddedMovies() || [];

      removeFromPage(id);
    }
  }
}
