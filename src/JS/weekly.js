window.addEventListener('DOMContentLoaded', function () {
  fetchFilmsWeeklyTrends();
});

function fetchFilmsWeeklyTrends() {
  const apiKeyWeeklyTrends = '839ee1ac45e2249141bd738796b376ad';
  const trendingUrlWeeklyTrends = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKeyWeeklyTrends}`;

  fetch(trendingUrlWeeklyTrends)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const filmsWeeklyTrends = data.results;
      const filmsContainerWeeklyTrends = document.getElementById(
        'weekly-trends-movies-container'
      );

      filmsWeeklyTrends.forEach(function (filmWeeklyTrends) {
        const filmIdWeeklyTrends = filmWeeklyTrends.id;
        const filmUrlWeeklyTrends = `https://api.themoviedb.org/3/movie/${filmIdWeeklyTrends}?api_key=${apiKeyWeeklyTrends}`;

        fetch(filmUrlWeeklyTrends)
          .then(function (response) {
            return response.json();
          })
          .then(function (filmDataWeeklyTrends) {
            const filmCardWeeklyTrends = createFilmCardWeeklyTrends(
              filmWeeklyTrends,
              filmDataWeeklyTrends
            );
            filmsContainerWeeklyTrends.appendChild(filmCardWeeklyTrends);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function createFilmCardWeeklyTrends(movie, data) {
  const movieCardWeeklyTrends = document.createElement('div');
  movieCardWeeklyTrends.className = 'weekly-trends-movie-card';

  if (movie.poster_path) {
    const posterUrlWeeklyTrends = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/src/images/coming_soon_default.jpg'; // шлях до вашої дефолтної картинки

    // const posterUrlWeeklyTrends = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const posterWeeklyTrends = document.createElement('img');
    posterWeeklyTrends.src = posterUrlWeeklyTrends;
    posterWeeklyTrends.alt = `${movie.title} Poster`;
    movieCardWeeklyTrends.appendChild(posterWeeklyTrends);

    const movieInfoWeeklyTrends = document.createElement('div');
    movieInfoWeeklyTrends.className = 'weekly-trends-movie-info';

    const titleGenresWrapperWeeklyTrends = document.createElement('div'); // Окремий div для заголовку та жанрів
    titleGenresWrapperWeeklyTrends.className = 'title-genres-wrapper';

    const titleCodeWeeklyTrends = document.createElement('h2');
    titleCodeWeeklyTrends.classList.add('weekly-trends-movie-title');
    titleCodeWeeklyTrends.textContent = movie.title;
    titleGenresWrapperWeeklyTrends.appendChild(titleCodeWeeklyTrends);

    const genresCodeWeeklyTrends = document.createElement('p');
    genresCodeWeeklyTrends.classList.add('weekly-trends-movie-genres');
    genresCodeWeeklyTrends.textContent = getGenres(
      data.genres,
      data.release_date
    );
    titleGenresWrapperWeeklyTrends.appendChild(genresCodeWeeklyTrends);

    movieInfoWeeklyTrends.appendChild(titleGenresWrapperWeeklyTrends);

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

    movieInfoWeeklyTrends.appendChild(ratingCodeWeeklyTrends);

    const ratingsArrayWeeklyTrends = document.querySelectorAll(
      '.weekly-trends-rating'
    );
    if (ratingsArrayWeeklyTrends.length > 0) {
      showStarsRatingWeeklyTrends();
    }

    function showStarsRatingWeeklyTrends() {
      let ratingActiveWeeklyTrends, ratingValueWeeklyTrends;
      for (let index = 0; index < ratingsArrayWeeklyTrends.length; index++) {
        const starRating = ratingsArrayWeeklyTrends[index];
        showStarRatingWeeklyTrends(starRating);
      }

      function showStarRatingWeeklyTrends(rating) {
        initRatingVarsWeeklyTrends(rating);

        setRatingActiveWidthWeekly();
      }

      function initRatingVarsWeeklyTrends(rating) {
        ratingActiveWeeklyTrends = rating.querySelector(
          '.weekly-trends-rating-active'
        );
        ratingValueWeeklyTrends = data.vote_average;
      }

      function setRatingActiveWidthWeekly(index = ratingValueWeeklyTrends) {
        const ratingActiveWidthWeeklyTrends = (index / 10) * 100;
        ratingActiveWeeklyTrends.style.width = `${ratingActiveWidthWeeklyTrends}%`;
      }
    }

    // Ініціалізування зіркового рейтингу RateYo
    // $(ratingElement).rateYo({
    //   rating: movieData.vote_average / 2, // Поділити рейтинг на 2, оскільки RateYo використовує шкалу від 0 до 5
    //   readOnly: true, // не можна змінювати рейтинг
    //   starWidth: '10px', // Розмір зірок
    //   precision: 2, // Заокруглення до двох десятих
    // });
    movieCardWeeklyTrends.appendChild(movieInfoWeeklyTrends);

    movieCardWeeklyTrends.addEventListener('click', function () {
      openModal(movie, data);
    });
  }

  return movieCardWeeklyTrends;
}

function getGenres(genresArrayFilmWeeklyTrends, releaseDateFilmWeeklyTrends) {
  const yearFilmWeeklyTrends = releaseDateFilmWeeklyTrends
    ? releaseDateFilmWeeklyTrends.slice(0, 4) // Отримуємо рік з дати
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
        .map(function (genreFilmWeeklyTrends) {
          return genreFilmWeeklyTrends.name;
        })
        .join(', ') +
      ' | ' +
      yearFilmWeeklyTrends
    );
  }
}

function openModal(movie, data) {
  // Виконати дії для відкриття модального вікна з детальною інформацією про фільм
  // У цьому коді я просто виведу інформацію про фільм у консоль для прикладу:
  console.log('Open Modal');
  console.log('Movie Title:', movie.title);
  console.log('Movie Genres:', getGenres(data.genres, data.release_date));
  console.log('Movie Rating:', data.vote_average);
}
