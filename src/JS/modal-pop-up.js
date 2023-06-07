import API_key from './api_key';
import axios from 'axios';
import {
  addMovieToLibrary,
  removeMovieFromLibrary,
  getMovieFromLibrary,
  renderLibraryData,
} from './library';
const url = window.location.href;
const LOCALSTORAGE = 'addedMovies';

export async function openModalPopUp(event) {
  const id = event;
  const data = await API(id);
  const code = await renderModal(data);
  console.log(id)
  // addBtn.addEventListener('click', sendToLocalStorage);
  // function sendToLocalStorage() {
  //   addTaskToStorage(data);
  // }
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
                <button type="button" class="add-btn"  id="add">Add to my library </button>   
                <button type="button" class="add-btn hidden" id="remove">Remove from my library</button>
                <button type="button" class="modal-close-button">X</button>
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
  const removeBtn = document.querySelector('#remove')
  function getAddedMovies() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE));
  }
  function setAddedMovies(arr) {
  localStorage.setItem(LOCALSTORAGE, JSON.stringify(arr));
}
  if (url.includes('library')) {
    addBtn.classList.add('hidden');
    removeBtn.classList.remove('hidden');
  }

  //
  let existing = getAddedMovies();
  existing = existing ? existing : []; // Робить перевірку на данні в локал сторедж

  //Якшо є даний фільм приховує кнопку «додати», показує «видалити»
  if (existing.includes(id)) {
    addBtn.classList.add('hidden');
    removeBtn.classList.remove('hidden');
  }

  // SHOOSE DOM ELEMENTS
  addBtn.addEventListener('click', onClickAdd);
  removeBtn.addEventListener('click', onClickRemove);

  // buttonAdd.classList.add('hidden');
  // buttonRemove.classList.remove('hidden'); ------------------- тут завалився проект!
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

    // Записує новий айді, відправляє данні в локал сторедж
    existing.push(id);
    setAddedMovies(existing);

    addBtn.classList.add('hidden');
    removeBtn.classList.remove('hidden');

    //   Робить рендеринг картки, якшо знаходимося на сторінці library
        if (url.includes('library')) {
          getInfoMovie(id).then(film => {
            myLibGallery.insertAdjacentHTML('beforeEnd', makeCard(film));
          });
        }
      }

      function onClickRemove() {
        let existing = getAddedMovies();
        existing = existing ? existing : [];
        if (existing.includes(id)) {
          let index = existing.findIndex(id => id === id);

          existing.splice(index, 1);
          setAddedMovies(existing);
          addBtn.classList.remove('hidden');
          removeBtn.classList.add('hidden');
        }

        if (url.includes('library')) {
          const libraryFilms = getAddedMovies() || [];
          if (libraryFilms.length === 0) {
            errorContainer.style.display = 'block';
          }

          removeFromPage(filmID);
        }
      }
    //
  // LOCAL STORAGE

  let currentID = 1;
  const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  const load = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  function createTaskObject({
    original_title,
    poster_path,
    vote_average,
    id,
    genre_names,
    genres,
    release_date,
  }) {
    return {
      original_title,
      poster_path,
      vote_average,
      id,
      genre_names,
      release_date,
      genres,
    };
  }
  function addTaskToStorage(text) {
    const currentState = load(LOCALSTORAGE);
    console.log(currentState);
    if (currentState === undefined) {
      save(LOCALSTORAGE, [createTaskObject(text)]);
    } else {
      currentState.push(createTaskObject(text));
      save(LOCALSTORAGE, currentState);
    }
    currentID += 1;
  }
}
// other
