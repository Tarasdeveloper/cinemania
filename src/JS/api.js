import axios from 'axios';
const API_key = '839ee1ac45e2249141bd738796b376ad';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getDayTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_key}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getVideos(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_key}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {});
}
