import API_key from './api_key';
import { showStarsRatingWeeklyTrends } from './star-rating.js';
import { openModalPopUp } from './modal-pop-up.js';
import img from '../images/coming_soon_default.jpg';

window.addEventListener('DOMContentLoaded', () => {
  const filmsContainerWeeklyTrends = document.getElementById(
    'weekly-trends-movies-container'
  );

  if (filmsContainerWeeklyTrends) {
    fetchFilmsWeeklyTrends();
  }
});

async function fetchFilmsWeeklyTrends() {
  try {
    const trendingUrlWeeklyTrends = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_key}`;
    const response = await fetch(trendingUrlWeeklyTrends);
    const data = await response.json();
    const filmsWeeklyTrends = data.results;
    const filmsContainerWeeklyTrends = document.getElementById(
      'weekly-trends-movies-container'
    );

    for (const filmWeeklyTrends of filmsWeeklyTrends) {
      const filmIdWeeklyTrends = filmWeeklyTrends.id;
      const filmUrlWeeklyTrends = `https://api.themoviedb.org/3/movie/${filmIdWeeklyTrends}?api_key=${API_key}`;
      const filmResponse = await fetch(filmUrlWeeklyTrends);
      const filmDataWeeklyTrends = await filmResponse.json();
      const filmCardWeeklyTrends = createFilmCardWeeklyTrends(
        filmWeeklyTrends,
        filmDataWeeklyTrends
      );
      filmsContainerWeeklyTrends.appendChild(filmCardWeeklyTrends);

      const ratingsArrayWeeklyTrends = filmCardWeeklyTrends.querySelectorAll(
        '.weekly-trends-rating'
      );
      if (ratingsArrayWeeklyTrends.length > 0) {
        showStarsRatingWeeklyTrends(
          ratingsArrayWeeklyTrends,
          filmDataWeeklyTrends
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function createFilmCardWeeklyTrends(movie, data) {
  const movieCardWeeklyTrends = document.createElement('div');
  movieCardWeeklyTrends.className = 'weekly-trends-movie-card';
  movieCardWeeklyTrends.dataset.id = data.id;

  if (movie.poster_path) {
    const posterUrlWeeklyTrends = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : img;
    const posterWeeklyTrends = document.createElement('img');
    posterWeeklyTrends.src = posterUrlWeeklyTrends;
    posterWeeklyTrends.alt = `${movie.title} Poster`;
    movieCardWeeklyTrends.appendChild(posterWeeklyTrends);

    const movieInfoWeeklyTrends = document.createElement('div');
    movieInfoWeeklyTrends.className = 'weekly-trends-movie-info';

    const titleGenresWrapperWeeklyTrends = document.createElement('div');
    titleGenresWrapperWeeklyTrends.className = 'title-genres-wrapper';

    const titleCodeWeeklyTrends = document.createElement('h2');
    titleCodeWeeklyTrends.classList.add('weekly-trends-movie-title');
    titleCodeWeeklyTrends.textContent = movie.title;
    movieInfoWeeklyTrends.appendChild(titleCodeWeeklyTrends);

    const genresCodeWeeklyTrends = document.createElement('p');
    genresCodeWeeklyTrends.classList.add('weekly-trends-movie-genres');
    genresCodeWeeklyTrends.textContent = getGenres(
      data.genres,
      data.release_date
    );
    titleGenresWrapperWeeklyTrends.appendChild(genresCodeWeeklyTrends);

    const ratingCodeWeeklyTrends = document.createElement('div');
    ratingCodeWeeklyTrends.className = 'weekly-trends-rating';
    const ratingBodyCodeWeeklyTrends = document.createElement('div');
    ratingBodyCodeWeeklyTrends.className = 'weekly-trends-rating-body';
    const ratingActiveCodeWeeklyTrends = document.createElement('div');
    ratingActiveCodeWeeklyTrends.className = 'weekly-trends-rating-active';
    const ratingItemsCodeWeeklyTrends = document.createElement('div');
    ratingItemsCodeWeeklyTrends.className = 'weekly-trends-rating-items';

    for (let i = 1; i <= 5; i++) {
      const ratingItemCodeWeeklyTrends = document.createElement('input');
      ratingItemCodeWeeklyTrends.type = 'radio';
      ratingItemCodeWeeklyTrends.className = 'weekly-trends-rating-item';
      ratingItemCodeWeeklyTrends.value = i;
      ratingItemCodeWeeklyTrends.name = `rating-${movie.title}`;
      ratingItemsCodeWeeklyTrends.appendChild(ratingItemCodeWeeklyTrends);
    }

    ratingActiveCodeWeeklyTrends.appendChild(ratingItemsCodeWeeklyTrends);
    ratingBodyCodeWeeklyTrends.appendChild(ratingActiveCodeWeeklyTrends);
    ratingCodeWeeklyTrends.appendChild(ratingBodyCodeWeeklyTrends);

    titleGenresWrapperWeeklyTrends.appendChild(ratingCodeWeeklyTrends);
    movieInfoWeeklyTrends.appendChild(titleGenresWrapperWeeklyTrends);

    movieCardWeeklyTrends.appendChild(movieInfoWeeklyTrends);

    movieCardWeeklyTrends.addEventListener('click', () => {
      openModalPopUp(data.id);
    });
  }

  return movieCardWeeklyTrends;
}

function getGenres(genresArrayFilmWeeklyTrends, releaseDateFilmWeeklyTrends) {
  const yearFilmWeeklyTrends = releaseDateFilmWeeklyTrends
    ? releaseDateFilmWeeklyTrends.slice(0, 4)
    : 'Not yet';

  if (genresArrayFilmWeeklyTrends.length === 0) {
    return 'Not yet | ' + yearFilmWeeklyTrends;
  } else if (genresArrayFilmWeeklyTrends.length > 2) {
    return (
      genresArrayFilmWeeklyTrends[0].name + ', others | ' + yearFilmWeeklyTrends
    );
  } else {
    return (
      genresArrayFilmWeeklyTrends
        .map(genreFilmWeeklyTrends => genreFilmWeeklyTrends.name)
        .join(', ') +
      ' | ' +
      yearFilmWeeklyTrends
    );
  }
}
