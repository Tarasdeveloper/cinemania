import axios from 'axios';
const API_KEY = '839ee1ac45e2249141bd738796b376ad';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getUppcomingVideos(page) {
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {});
}

export async function getGenre() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {});
}
