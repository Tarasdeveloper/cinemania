import { getUppcomingVideos, getGenre } from './upcoming_api';
import axios from 'axios';
import basicLightbox from 'basiclightbox';

const refs = {
  upcomingEmptySection: document.getElementById('upcomingEmptySection'),
  upcomingSection: document.getElementById('upcomingMoviesSection'),
  upcomingMovieImg: document.getElementById('upcomingPosterPath'),
  upcomingTitle: document.getElementById('upcomingFilmTitle'),
  upcomingDate: document.getElementById('upcomingDate'),
  upcomingVoteAverage: document.getElementById('upcomingVoteAverage'),
  upcomingVoteCount: document.getElementById('upcomingVoteCount'),
  upcomingPop: document.getElementById('upcomingPop'),
  upcomingGenre: document.getElementById('upcomingGenre'),
  upcomingAbout: document.getElementById('upcomingAbout'),
};

async function displayUpcomingMovie() {
  try {
    let categoriesMovie = [];

    const { results, dates } = await getUppcomingVideos(1);
    const { genres } = await getGenre();

    const filteredUpcomingMovies = results.filter(movie => {
      const releaseMovieDate = new Date(movie.release_date);
      return (
        releaseMovieDate >= new Date(dates.minimum) &&
        releaseMovieDate <= new Date(dates.maximum)
      );
    });

    if (filteredUpcomingMovies.length > 0) {
      const upcomingMovie =
        filteredUpcomingMovies[
          Math.floor(Math.random() * filteredUpcomingMovies.length)
        ];

      window.addEventListener('resize', function (e) {
        upcomingChancheImg();
      });

      function upcomingChancheImg() {
        let upcomingPosterPath;
        let upcomingImageUrl;

        if (window.innerWidth <= 767) {
          upcomingPosterPath = upcomingMovie.poster_path;
          upcomingImageUrl = `https://image.tmdb.org/t/p/w500${upcomingPosterPath}`;
        } else {
          upcomingPosterPath = upcomingMovie.backdrop_path;
          upcomingImageUrl = `https://image.tmdb.org/t/p/original/${upcomingPosterPath}`;
        }
        refs.upcomingMovieImg.setAttribute('src', upcomingImageUrl);
      }

      upcomingChancheImg();

      upcomingMovie.genre_ids.forEach((id, index) => {
        if (index <= 1) {
          if (genres.find(gener => gener.id == id)) {
            let gener = genres.find(gener => gener.id == id);
            categoriesMovie.push(gener.name);
          }
        }
      });

      const releaseUpcomingDate = new Date(upcomingMovie.release_date);
      const formatteUpcomingDate = releaseUpcomingDate.toLocaleDateString(
        'uk-UA',
        {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }
      );

      const id = upcomingMovie.id;
      const url = window.location.href;
      const addBtn = document.getElementById('addUpcoming');
      const removeBtn = document.getElementById('removeUpcoming');
      function getAddedMovies() {
        return JSON.parse(localStorage.getItem('addedMovies'));
      }
      function setAddedMovies(arr) {
        localStorage.setItem('addedMovies', JSON.stringify(arr));
      }
      if (url.includes('library')) {
        addBtn.classList.add('hidden');
        removeBtn.classList.remove('hidden');
      }
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
            .catch(error);
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

          removeFromPage(id);
        }
      }

      refs.upcomingTitle.innerHTML = upcomingMovie.original_title;
      refs.upcomingDate.innerHTML = formatteUpcomingDate;
      refs.upcomingVoteAverage.innerHTML = upcomingMovie.vote_average;
      refs.upcomingVoteCount.innerHTML = upcomingMovie.vote_count;
      refs.upcomingPop.innerHTML = upcomingMovie.popularity;
      refs.upcomingGenre.innerHTML = categoriesMovie.join(', ');
      refs.upcomingAbout.innerHTML = upcomingMovie.overview;
    } else {
      refs.upcomingEmptySection.classList.remove('hidden');
      refs.upcomingSection.classList.add('hidden');
    }
  } catch (error) {}
}

displayUpcomingMovie();
