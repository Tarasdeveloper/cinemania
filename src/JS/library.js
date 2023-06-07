import { getSecondMovieById } from './api';
import { LOCALSTORAGE } from './modal-pop-up';

const librariesKey = LOCALSTORAGE;

function createListMarkup(data) {
  if (data) {
    return data
      .map(
        ({
          original_title,
          poster_path,
          vote_average,
          id,
          genre_names,
          release_date,
        }) => {
          let posterPath = ``;
          if (poster_path) {
            posterPath = `${'https://api.themoviedb.org/3'}${`/w400`}${poster_path}`;
          }

          let ratingStars = '';

          const rating = Math.round(vote_average);

          switch (rating) {
            case 0:
              ratingStars = `${emptyStar.repeat(5)}`;
              break;
            case 1:
              ratingStars = `${halfStar}${emptyStar.repeat(4)}`;
              break;
            case 2:
              ratingStars = `${fullStar}${emptyStar.repeat(4)}`;
              break;
            case 3:
              ratingStars = `${fullStar}${halfStar}${emptyStar.repeat(3)}`;
              break;
            case 4:
              ratingStars = `${fullStar.repeat(2)}${emptyStar.repeat(3)}`;
              break;
            case 5:
              ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(
                2
              )}`;
              break;
            case 6:
              ratingStars = `${fullStar.repeat(3)}${emptyStar.repeat(2)}`;
              break;
            case 7:
              ratingStars = `${fullStar.repeat(3)}${halfStar}${emptyStar}`;
              break;
            case 8:
              ratingStars = `${fullStar.repeat(4)}${emptyStar}`;
              break;
            case 9:
              ratingStars = `${fullStar.repeat(4)}${halfStar}`;
              break;
            case 10:
              ratingStars = `${fullStar.repeat(5)}`;
              break;
          }

          return `<li class='cards-list__item hover-cursor' data-id='${id}'>
            <img
              class='cards-list__img'
              src='${posterPath}'
              alt='${original_title}'
              width
              loading='lazy'
              data-id='${id}'
            />
            <div class='cards-list__wrap'>
              <div class='cards-list__info'>
                <h2 class='cards-list__title'>${original_title}</h2>
                <div class='cards-list_second_line'>
                  <div class='cards-list__text'>
                    <p>${genre_names} | ${release_date}</p>
                </div>
                <div class='star-rate'>
                ${ratingStars}
              </div> 
              </div>
              </div>
                
            </div>
            </li>
            `;
        }
      )
      .join('');
  }
}

let page = 1;
let perPage = 9;

const refs = {
  libraryList: document.querySelector('.library-list'),
  loadMoreButton: document.getElementById('loadMore'),
};

if (refs.libraryList) renderLibraryData();
if (refs.loadMoreButton) {
  refs.loadMoreButton.addEventListener('click', () => {
    page += 1;
    renderLibraryData();
  });
}

export function addMovieToLibrary(movieId) {
  getSecondMovieById(movieId).then(movie => {
    movie.genre_names = movie.genres
      .map(genre => {
        return genre.name;
      })
      .slice(0, 2)
      .join(',');
    if (movie.release_date) {
      movie.release_date = movie.release_date.slice(0, 4);
    }
    let libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
    libraries[movie.id] = movie;
    localStorage.setItem(librariesKey, JSON.stringify(libraries));
  });
}

export function removeMovieFromLibrary(movieId) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  delete libraries[movieId];
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
  if (refs.libraryList) renderLibraryData();
}

export function getMovieFromLibrary(movieId) {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return libraries[movieId];
}

function getMoviesFromLibrary() {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return Object.values(libraries);
}

export function renderLibraryData() {
  let movieMarkup = renderMovies();
  if (!movieMarkup) {
    movieMarkup = `
    <div class=" container">
      <p class="library-text__oops">OOPS... <br> We are very sorry! <br> You don't have any movies at your library.</p>
    </div>
      `;
  } else {
    movieMarkup = `<ul class="cards__list films">${movieMarkup}</ul>`;
  }
  refs.libraryList.innerHTML = movieMarkup;
}

function renderMovies() {
  const allMovies = getMoviesFromLibrary();

  if (!Object.keys(allMovies)) {
    return null;
  }

  let movies = allMovies.slice(0, page * perPage);

  const markup = createListMarkup(movies);

  return markup;
}

console.log(localStorage);
