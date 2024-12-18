import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromWatchListIcon from "../components/cardIcons/removeFromWatchList";

const WatchListPage = () => {
  const { watchList: movieIds } = useContext(MoviesContext);

  const watchListQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = watchListQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchListQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Watch List"
      movies={movies}
      action={(movie) => {
        return <RemoveFromWatchListIcon movie={movie} />;
      }}
    />
  );
};

export default WatchListPage;
