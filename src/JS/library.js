import { openModalPopUp } from './modal-pop-up';
import axios from 'axios';
import { showStarsRatingWeeklyTrends } from './star-rating';
import img from '../images/coming_soon_default.jpg';

export const myLibGallery = document.querySelector('.mylib-gallery__list');
const libContent = document.querySelector('#is-hidden');
export const errorContainer = document.querySelector('.error-lib');
const libGallery = document.querySelector('.gallery-hidden');

const url = window.location.href;
const libraryFilms = getAddedMovies() || [];

function getAddedMovies() {
  return JSON.parse(localStorage.getItem('addedMovies'));
}

const MAIN_URL = 'https://api.themoviedb.org/3';
async function getArrayOfMovies(array) {
  const arrayOfMovies = array.map(async movie_id => {
    return await axios
      .get(
        `${MAIN_URL}/movie/${movie_id}?api_key=${'839ee1ac45e2249141bd738796b376ad'}`
      )
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  });

  const resultData = await Promise.all(arrayOfMovies);
  return resultData;
}

if (url.includes('mylibrary')) {
  function renderLibrary(arrOfFilms) {
    getArrayOfMovies(arrOfFilms)
      .then(data => {
        if (data.length === 0) {
          libContent.classList.remove('is-hidden');
          return;
        }
        data.map(film => {
          myLibGallery.insertAdjacentHTML('beforeEnd', makeCard(film));
          libGallery.classList.remove('gallery-hidden');
          const catalogCard = document.querySelector('.catalog__card');
        });
      })
      .catch(error => console.error(error));
  }

  renderLibrary(libraryFilms);

  function makeCard({
    id,
    poster_path,
    title,
    name,
    genres,
    release_date,
    first_air_date,
    vote_average,
  }) {
    const arrOfGenres = getNameOfGenres(genres);
    let stringOfGenres = arrOfGenres.join(', ');
    const style = stringOfGenres.length === 0 ? 'none' : 'inline-block';
    if (stringOfGenres.length > 18) {
      stringOfGenres = arrOfGenres.slice(0, 1).join(', ');
    }

    const date = release_date || first_air_date;

    const cardElement = document.createElement('li');
    cardElement.classList.add('catalog__card');
    cardElement.dataset.id = id;
    const imagePath = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : img;
    cardElement.innerHTML = `
      <div class="catalog__img-wrapper">
        <img src="${imagePath}" alt="${
      name || title
    }" width="395" height="574" class="catalog__img lazyload" />
      </div>
      <div class="catalog__info info">
        <p class="info__title">${name || title}</p>
        <div class="info__wrap">
          <ul class="info__list">
            <li class="info__descr" style="display:${style}">${stringOfGenres}</li>
            <li class="info__descr">${convertReleaseDate(date)}</li>
          </ul>
                <div class="weekly-trends-rating">
          <div class="weekly-trends-rating-body">
            <div class="weekly-trends-rating-active">
              <div class="weekly-trends-rating-items">
                <input
                  type="radio"
                  class="weekly-trends-rating-item"
                  value="1"
                  name="rating"
                />
                <input
                  type="radio"
                  class="weekly-trends-rating-item"
                  value="2"
                  name="rating"
                />
                <input
                  type="radio"
                  class="weekly-trends-rating-item"
                  value="3"
                  name="rating"
                />
                <input
                  type="radio"
                  class="weekly-trends-rating-item"
                  value="4"
                  name="rating"
                />
                <input
                  type="radio"
                  class="weekly-trends-rating-item"
                  value="5"
                  name="rating"
                />
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    `;

    const ratingsArrayWeeklyTrends = cardElement.querySelectorAll(
      '.weekly-trends-rating'
    );
    if (ratingsArrayWeeklyTrends.length > 0) {
      showStarsRatingWeeklyTrends(ratingsArrayWeeklyTrends, { vote_average });
    }

    return cardElement.outerHTML;
  }

  function convertReleaseDate(date) {
    if (date) {
      return date.slice(0, 4);
    } else return '';
  }

  function getNameOfGenres(arrGenres) {
    const arr = [];
    arrGenres.map(genre => {
      genre.name === 'Science Fiction' ? (genre.name = 'Sci-Fi') : genre.name;
      arr.push(genre.name);
    });
    return arr.slice(0, 2);
  }

  myLibGallery.addEventListener('click', openModal);
  function openModal(event) {
    console.dir(event.target.offsetParent.dataset.id);
    const id = event.target.offsetParent.dataset.id;
    openModalPopUp(id);
  }
}
