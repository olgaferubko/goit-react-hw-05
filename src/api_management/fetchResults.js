import axios from "axios";

const API_KEY = "8aba4e3419a44727b7eb66f35fce4fa2";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

async function fetchFromApi(endpoint) {
  try {
    const { data } = await axios.get(`${endpoint}&api_key=${API_KEY}`);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchTrending() {
  return fetchFromApi("trending/movie/day?language=en-US").then(data => data.results);
}

export async function fetchDetails(id) {
  return fetchFromApi(`movie/${id}?language=en-US`);
}

export async function fetchCast(id) {
  return fetchFromApi(`movie/${id}/credits?language=en-US`).then(data => data.cast);
}

export async function fetchReviews(id) {
  return fetchFromApi(`movie/${id}/reviews?language=en-US&page=1`).then(data => data.results);
}

export async function fetchQuery(query) {
  return fetchFromApi(`search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`).then(data => data.results);
}
