import { getUppcomingVideos, getGenre } from './upcoming_api';

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
  } catch (error) {
    console.log(error);
  }
}

displayUpcomingMovie();
