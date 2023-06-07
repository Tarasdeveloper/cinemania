import { getDayTrending, getVideos } from './api';
import * as basicLightbox from 'basiclightbox';
import { emptyStar, halfStar, fullStar } from './stars';
import { openModalPopUp } from './modal-pop-up.js';

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
  let ratingStars = '';

  const rating = Math.round(movieOfDay.vote_average);

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
      ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(2)}`;
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
    default:
      throw new Error('Invalid rating');
  }
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
              <div class='start-rate__hero'>
                ${ratingStars}
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

  hero.innerHTML = markup;
}

displayTrendingMovie();
