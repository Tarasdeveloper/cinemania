export function showStarsRatingWeeklyTrends(ratingsArrayWeeklyTrends, data) {
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
