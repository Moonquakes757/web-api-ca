import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Link } from "react-router-dom";

import { getLocalMovies, getTmdbMovieFromBackend } from "../api/localMoviesApi";

const HomePage = (props) => {

  const { data: discoverData, error: discoverError, isLoading: dLoading, isError:dIsError }  = useQuery('discover',getMovies);
  const { data: localData, error: localError, isLoading: lLoading, isError: lIsError } = useQuery("localMovies", getLocalMovies);
  const { data: tmdbData, error: tmdbError, isLoading: tLoading, isError: tIsError } = useQuery(["tmdbMovieBackend", 550], () => getTmdbMovieFromBackend(550));
  
  if (dLoading || lLoading || tLoading) {
    return <Spinner />;
  }

  if (dIsError) return <h1>{discoverError.message}</h1>;
  if (lIsError) return <h1>{localError.message}</h1>;
  if (tIsError) return <h1>{tmdbError.message}</h1>;

  const discoverMovies = discoverData.results || [];
  const localMovies = localData;
  const tmdbMovie = tmdbData;

  // Redundant, but necessary to avoid app crashing.
  const favorites = discoverMovies.filter((m) => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <div style={{ margin: "0 2rem" }}>
      <h1>Home Page</h1>

      {/* 1 The original Discover Movies */}
      <section>
        <PageTemplate
          title="Discover Movies (TMDB official)"
          movies={discoverMovies}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
      </section>

      {/* 2 Movies from local database */}
      <section>
        <h2>Local Movies (from your MongoDB via /api/movies/all)</h2>
        {localMovies.length > 0 ? (
          <ul>
            {localMovies.map((movie) => (
              <li key={movie._id || movie.id}>
                {movie.title} ({movie.release_date})
              </li>
            ))}
          </ul>
        ) : (
          <p>No local movies found.</p>
        )}
      </section>

      {/* 3 show specific TMDB movie (550 )*/}
      <section>
        <h2>Single TMDB Movie via your backend (/tmdb/:movieId)</h2>
        {tmdbMovie ? (
          <div>
            <p>
              <strong>Title:</strong> {tmdbMovie.title}
            </p>
            <p>
              <strong>Overview:</strong> {tmdbMovie.overview}
            </p>
            <p>
              <strong>Release Date:</strong> {tmdbMovie.release_date}
            </p>
          </div>
        ) : (
          <p>Movie not found</p>
        )}
      </section>
    </div>
  );
};
export default HomePage;