const BASE_URL = "http://localhost:8080/api/movies";

// GET all movies
export async function getLocalMovies() {
    const token = localStorage.getItem("token") || "";

    const response = await fetch(`${BASE_URL}/all`, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch local movies");
    }
    return response.json();
}

// GET specific movie from TMDB movieId
export async function getTmdbMovieFromBackend(movieId) {
    const token = localStorage.getItem("token") || "";

    const response = await fetch(`${BASE_URL}/tmdb/${movieId}`,{
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch TMDB movie from backend");
    }
    return response.json();
}
