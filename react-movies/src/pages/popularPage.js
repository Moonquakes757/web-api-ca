import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularPage = () => {
  const { data, error, isLoading, isError } = useQuery("popular", getPopularMovies);
  const { addToMustWatch } = useContext(MoviesContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => {
        return (
            <AddToFavoritesIcon movie={movie} />
        );
      }}
    />
  );
};

export default PopularPage;
