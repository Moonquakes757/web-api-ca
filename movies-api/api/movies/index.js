import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies } from '../tmdb-api';
import { getMovieGenres } from '../tmdb-api';
import axios from 'axios';

const router = express.Router();


//New router1: GET /api/movies/all
router.get('/all', asyncHandler(async (req, res) => {
    try {
        const movies = await movieModel.find({});
        return res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch all movies from DB' });
    }
}));


//New router2: GET /api/movies/tmdb/:movieId
router.get('/tmdb/:movieId', asyncHandler(async (req, res) => {
    try {
        const { movieId } = req.params;
        const tmdbKey = process.env.TMDB_KEY;
        if (!tmdbKey) {
            return res.status(500).json({ error: 'TMDB_KEY is not set in .env' });
        }

        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKey}`;
        const response = await axios.get(url);

        return res.status(200).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch movie from TMDB' });
    }
}));

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Add a new route to fetch genres
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
}));

export default router;
