import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);
  const { addToWatchList } = useContext(MoviesContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
            <PlaylistAddIcon
              color="primary"
              sx={{ 
                fontSize: 30, 
                cursor: "pointer",
                "&:hover": {
                  color: "red",
                  opacity: 0.7,
                }
               }}
              onClick={() => addToWatchList(movie)} 
            />
          );
      }}
    />
  );
};

export default UpcomingMoviesPage;
