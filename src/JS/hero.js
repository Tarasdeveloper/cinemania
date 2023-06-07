import { getDayTrending, getVideos } from './api';
import * as basicLightbox from 'basiclightbox';
import { openModalPopUp } from './modal-pop-up.js';
import { showStarsRatingWeeklyTrends } from './star-rating.js';

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
        const instance = basicLightbox.create(
          `<div class="notification-trailer-fail"></div>`
        );
        instance.show(() => console.log('lightbox now visible'));
      }
    });

    const detailsBtn = document.getElementById('details-btn');
    detailsBtn.addEventListener('click', () => {
      openModalPopUp(movieOfDay.id);
    });
  } catch (error) {
    console.log(error);
  }
}

function createAndShowLightbox(keyTrailer) {
  const content = `<div class="video-container">
    <button class="close-btn">Close</button>
    <iframe class="iframe" src="https://www.youtube.com/embed/${keyTrailer}" width="560" height="315" frameborder="0"></iframe>
  </div>`;

  lightboxInstance = basicLightbox.create(content);

  lightboxInstance.show(() => {
    console.log('lightbox now visible');
    const closeBtn = lightboxInstance.element().querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      resetLightbox();
    });
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
  const markup = `
    <div class="hero-container">
        <div class="hero-container__background">
          <div class="hero-container__background-dark"></div>
          <div class="hero-container__background-image" 
            style="background-image: 
            url(https://image.tmdb.org/t/p/original${
              movieOfDay.backdrop_path
            }" alt="Hero image" class="backend" loading="lazy");"> 
          </div>
        </div>
      <div class="hero-container__card">
          <div class="hero-container__content">
            <div class="hero-container__content-box">
              <h1 class="hero-container__title">${
                movieOfDay.title || movieOfDay.name
              }</h1>
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
              <p class="hero-container__description">${
                movieOfDay.overview.slice(0, 108) + '...'
              }</p>
              <div class="hero-container__btns">
                <button class="trailer-btn" id="trailer-btn" data-btn="trailer-fail">Watch trailer</button>
                <button class="more-details-btn" id="details-btn" data-btn="details-fail">More details</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  `;

  const ratingsArrayWeeklyTrends = document.querySelectorAll(
    '.weekly-trends-rating'
  );
  if (ratingsArrayWeeklyTrends.length > 0) {
    showStarsRatingWeeklyTrends(ratingsArrayWeeklyTrends, data);
  }
  hero.innerHTML = markup;
}

displayTrendingMovie();
