import { getDayTrending, getVideos } from './api';
import * as basicLightbox from 'basiclightbox';
import { openModalPopUp } from './modal-pop-up.js';
import { showStarsRatingWeeklyTrends } from './star-rating.js';
import { openModalOops } from './modal-oops';
import { openModalOopsDetails } from './modal-oops-details';
import img from '../images/coming_soon_default.jpg';

const hero = document.querySelector('.hero');
let lightboxInstance = null;

async function displayTrendingMovie() {
  try {
    const { results } = await getDayTrending(1);
    const movieOfDay = results[Math.floor(Math.random() * results.length)];

    createTrendingMarkup(movieOfDay);

    const trailerBtn = document.getElementById('trailer-btn');
    trailerBtn.addEventListener('click', async () => {
      try {
        const videos = await getVideos(movieOfDay.id);
        const infoTrailer = videos.find(el => el.name === 'Official Trailer');

        if (!infoTrailer) {
          throw new Error('Trailer is not found');
        }

        const keyTrailer = infoTrailer.key;

        if (lightboxInstance) {
          lightboxInstance.close();
        }

        createAndShowLightbox(keyTrailer);
      } catch (error) {
        openModalOops();
      }
    });

    const detailsBtn = document.getElementById('details-btn');
    detailsBtn.addEventListener('click', async () => {
      try {
        await openModalPopUp(movieOfDay.id);
      } catch (error) {
        openModalOopsDetails();
      }
    });

    const ratingsArrayWeeklyTrends = document.querySelectorAll(
      '.weekly-trends-rating'
    );
    if (ratingsArrayWeeklyTrends.length > 0) {
      showStarsRatingWeeklyTrends(ratingsArrayWeeklyTrends, movieOfDay);
    }
  } catch (error) {
    handleError(error);
  }
}

function createAndShowLightbox(keyTrailer) {
  const content = `
  <div class="watch-trailer-backdrop">
    <div class="video-container">
      <iframe class="iframe" src="https://www.youtube.com/embed/${keyTrailer}" width="560" height="315" frameborder="0"></iframe>
    </div>
  </div>
  `;

  lightboxInstance = basicLightbox.create(content);

  lightboxInstance.show(() => {
    console.log('lightbox now visible');
    document.body.classList.add('modal-open');
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      resetLightbox();
      document.body.classList.remove('modal-open');
    }
  });

  const watchTrailerBackdrop = document.querySelector(
    '.watch-trailer-backdrop'
  );

  watchTrailerBackdrop.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      resetLightbox();
      document.body.classList.remove('modal-open');
    }
  });

  document.getElementById('trailer-btn').disabled = true;
}

function resetLightbox() {
  if (lightboxInstance) {
    lightboxInstance.close();
    lightboxInstance = null;
  }

  document.getElementById('trailer-btn').disabled = false;
}

function createTrendingMarkup(movieOfDay) {
  const movieTitle = movieOfDay.title || movieOfDay.name;
  const movieDescription = movieOfDay.overview.slice(0, 108) + '...';
  const imagePath = movieOfDay.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movieOfDay.backdrop_path}`
    : img;

  const markup = `
    <div class="hero-container">
      <div class="hero-container__background">
        <div class="hero-container__background-dark"></div>
        <div class="hero-container__background-darker"></div>
        <div class="hero-container__background-image" 
          style="background-image: url(https://image.tmdb.org/t/p/original${imagePath}" alt="Hero image" class="backend" loading="lazy");"> 
        </div>
      </div>
      <div class="hero-container__card">
        <div class="hero-container__content">
          <div class="hero-container__content-box">
            <h1 class="hero-container__title">${movieTitle}</h1>
            <div class="weekly-trends-rating">
              <div class="weekly-trends-rating-body">
                <div class="weekly-trends-rating-active">
                  <div class="weekly-trends-rating-items">
                    <input type="radio" class="weekly-trends-rating-item" value="1" name="rating" />
                    <input type="radio" class="weekly-trends-rating-item" value="2" name="rating" />
                    <input type="radio" class="weekly-trends-rating-item" value="3" name="rating" />
                    <input type="radio" class="weekly-trends-rating-item" value="4" name="rating" />
                    <input type="radio" class="weekly-trends-rating-item" value="5" name="rating" />
                  </div>
                </div>
              </div>
            </div> 
            <p class="hero-container__description">${movieDescription}</p>
            <div class="hero-container__btns">
              <button class="trailer-btn" id="trailer-btn" data-btn="trailer-fail">Watch trailer</button>
              <button class="more-details-btn" id="details-btn" data-btn="details-fail">More details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  hero.innerHTML = markup;

  const ratingsArrayWeeklyTrends = document.querySelectorAll(
    '.weekly-trends-rating'
  );
  if (ratingsArrayWeeklyTrends.length > 0) {
    showStarsRatingWeeklyTrends(ratingsArrayWeeklyTrends, movieOfDay);
  }
}

function handleError(error) {
  console.log(error);
  if (!movieOfDay.data) {
    openModalOopsDetails();
  }
  openModalOops();
}

displayTrendingMovie();
