// import { getSecondMovieById } from './api';


// const librariesKey = 'addedMovies';

// function createListMarkup(data) {
//   if (data) {
//     return data
//       .map(
//         ({
//           original_title,
//           poster_path,
//           vote_average,
//           id,
//           genres,
//           release_date,
//         }) => {
//           let posterPath = ``;
//           if (poster_path) {
//             posterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
//           }
//           let genresNew = '';
//   for (const genre of genres) {
//     genresNew += `${genre.name} `;
//   }

//           // let ratingStars = '';

//           // const rating = Math.round(vote_average);

//           // switch (rating) {
//           //   case 0:
//           //     ratingStars = `${emptyStar.repeat(5)}`;
//           //     break;
//           //   case 1:
//           //     ratingStars = `${halfStar}${emptyStar.repeat(4)}`;
//           //     break;
//           //   case 2:
//           //     ratingStars = `${fullStar}${emptyStar.repeat(4)}`;
//           //     break;
//           //   case 3:
//           //     ratingStars = `${fullStar}${halfStar}${emptyStar.repeat(3)}`;
//           //     break;
//           //   case 4:
//           //     ratingStars = `${fullStar.repeat(2)}${emptyStar.repeat(3)}`;
//           //     break;
//           //   case 5:
//           //     ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(
//           //       2
//           //     )}`;
//           //     break;
//           //   case 6:
//           //     ratingStars = `${fullStar.repeat(3)}${emptyStar.repeat(2)}`;
//           //     break;
//           //   case 7:
//           //     ratingStars = `${fullStar.repeat(3)}${halfStar}${emptyStar}`;
//           //     break;
//           //   case 8:
//           //     ratingStars = `${fullStar.repeat(4)}${emptyStar}`;
//           //     break;
//           //   case 9:
//           //     ratingStars = `${fullStar.repeat(4)}${halfStar}`;
//           //     break;
//           //   case 10:
//           //     ratingStars = `${fullStar.repeat(5)}`;
//           //     break;
//           // }

//           return `<li class='cards-list__item hover-cursor' data-id='${id}'>
//             <img
//               class='cards-list__img'
//               src='${posterPath}'
//               alt='${original_title}'
//               width
//               loading='lazy'
//               data-id='${id}'
//             />
//             <div class='cards-list__wrap'>
//               <div class='cards-list__info'>
//                 <h2 class='cards-list__title'>${original_title}</h2>
//                 <div class='cards-list_second_line'>
//                   <div class='cards-list__text'>
//                     <p>${genresNew} | ${release_date}</p>
//                 </div>
//                 <div class='star-rate'>
                
//               </div>
//               </div>
//               </div>
                
//             </div>
//             </li>
//             `;
//         }
//       )
//       .join('');
//   }
// }

// let page = 1;
// let perPage = 9;

// const refs = {
//   libraryList: document.querySelector('.library-list'),
//   loadMoreButton: document.getElementById('loadMore'),
// };

// if (refs.libraryList) renderLibraryData();
// if (refs.loadMoreButton) {
//   refs.loadMoreButton.addEventListener('click', () => {
//     page += 1;
//     renderLibraryData();
//   });
// }

// export function addMovieToLibrary(movieId) {
//   getSecondMovieById(movieId).then(movie => {
//     movie.genre_names = movie.genres
//       .map(genre => {
//         return genre.name;
//       })
//       .slice(0, 2)
//       .join(',');
//     if (movie.release_date) {
//       movie.release_date = movie.release_date.slice(0, 4);
//     }
//     let libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
//     libraries[movie.id] = movie;
//     localStorage.setItem(librariesKey, JSON.stringify(libraries));
//   });
// }

// export function removeMovieFromLibrary(movieId) {
//   let libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
//   delete libraries[movieId];
//   localStorage.setItem(librariesKey, JSON.stringify(libraries));
//   if (refs.libraryList) renderLibraryData();
// }

// export function getMovieFromLibrary(movieId) {
//   const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
//   return libraries[movieId];
// }

// function getMoviesFromLibrary() {
//   const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
//   return Object.values(libraries);
// }

// export function renderLibraryData() {
//   let movieMarkup = renderMovies();
//   if (!movieMarkup) {
//     movieMarkup = `
//     <div class=" container">
//       <p class="library-text__oops">OOPS... <br> We are very sorry! <br> You don't have any movies at your library.</p>
//     </div>
//       `;
//   } else {
//     movieMarkup = `<ul class="cards__list films">${movieMarkup}</ul>`;
//   }
//   refs.libraryList.innerHTML = movieMarkup;
// }

// export function renderMovies() {
//   const allMovies = getMoviesFromLibrary();

//   if (!Object.keys(allMovies)) {
//     return null;
//   }

//   let movies = allMovies.slice(0, page * perPage);

//   const markup = createListMarkup(movies);

//   return markup;
// }

// console.log(localStorage);
import { openModalPopUp } from "./modal-pop-up";
import axios from "axios";
  export const myLibGallery = document.querySelector('.mylib-gallery__list');
const libContent = document.querySelector('#is-hidden');
export const errorContainer = document.querySelector('.error-lib');
const libGallery = document.querySelector('.gallery-hidden');

const url = window.location.href;
const libraryFilms = getAddedMovies() || [];
function getAddedMovies() {
    return JSON.parse(localStorage.getItem('addedMovies'));
}
console.log("hi")
const MAIN_URL = 'https://api.themoviedb.org/3';
async function getArrayOfMovies(array) {
  const arrayOfMovies = array.map(async movie_id => {
    return await axios
      .get(`${MAIN_URL}/movie/${movie_id}?api_key=${'839ee1ac45e2249141bd738796b376ad'}`)
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
          const catalogCard = document.querySelector(".catalog__card")
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

  return `<li class="catalog__card" data-id="${id}">
    <div class="catalog__img-wrapper">
      <img src="https://image.tmdb.org/t/p/w500${
        poster_path || 'Oops. There is no poster to this movie'
      }" alt="${
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
  <div class="catalog__stars-wrap">
  <div class="catalog__rating-active" style="width:${
    vote_average / 2 / 0.05
  }%"></div>
  </div>
  </div>
    </div>
  </li>`;
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
myLibGallery.addEventListener("click", openModal)
          function openModal(event) {
            console.dir(event.target.offsetParent.dataset.id)
            const id = event.target.offsetParent.dataset.id
            openModalPopUp(id)
          }
}

