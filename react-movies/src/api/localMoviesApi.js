const BASE_URL = "http://localhost:8080/api/movies";

// GET all movies
export async function getLocalMovies() {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch local movies");
  }
  return response.json();
}

// GET specific movie from TMDB movieId
export async function getTmdbMovieFromBackend(movieId) {
  const response = await fetch(`${BASE_URL}/tmdb/${movieId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch TMDB movie from backend");
  }
  return response.json(); // 返回单个电影对象
}
