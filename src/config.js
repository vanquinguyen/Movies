export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "c3a69193d41c557d12cd80fb840d67ed";
const tmdbEnpoint = "https://api.themoviedb.org/3/movie";
const tmdbEnpointSearch = "https://api.themoviedb.org/3/search/movie";
const imageUrl = "https://image.tmdb.org/t/p";
export const tmdbAPI = {
  getMovieList(type) {
    return `${tmdbEnpoint}/${type}?api_key=${apiKey}`;
  },
  getBanner(type) {
    return `${tmdbEnpoint}/${type}?api_key=${apiKey}`;
  },
  getMovieType(movieId, type) {
    return `${tmdbEnpoint}/${movieId}/${type}?api_key=${apiKey}`;
  },
  getMovieDetails(movieId) {
    return `${tmdbEnpoint}/${movieId}?api_key=${apiKey}`;
  },
  getMoviePage(type, nextPage) {
    return `${tmdbEnpoint}/${type}?api_key=${apiKey}&page=${nextPage}`;
  },
  getMoviePageFilter(filter, nextPage) {
    return `${tmdbEnpointSearch}?api_key=${apiKey}&&query=${filter}&page=${nextPage}`;
  },
  imageOriginal(url) {
    return `${imageUrl}/original/${url}`;
  },
  image500(url) {
    return `${imageUrl}/w500/${url}`;
  },
};
