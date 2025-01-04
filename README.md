# Assignment 2 - Web API.

Name: Shaohua Xu

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Fetch all the movies list from MongoDB
 + Fetch details of one specific movie from TMDB (movieid)
 + A login page for users to login
 + Show all the movies list on the home page
 + Show one specific movie on the home page

## Setup requirements.

To set up and run this project locally, please ensure you meet the following requirements:

 - Prerequisites Node.js (v16 or above) npm (v8 or above): Comes with Node.js installation. A text editor or IDE (e.g., VS Code).

 - TMDB API Key This project uses the TMDB API to fetch movie data. You must create a free account on TMDB and generate an API key. Follow these steps:

    Go to TMDB API. Log in or create a new account. Navigate to Settings > API > Create API Key. Copy your API key and replace it in the tmdb-api.js file:

    const API_KEY = "your_tmdb_api_key_here"

 - Clone the Repository Clone the project repository from GitHub:

 - run git clone https://github.com/Moonquakes757/web-api-ca.git

 - Install Dependencies Install all required dependencies by running:
    npm install

 - Environment Configuration (Optional) If you'd like to store the TMDB API key in an environment file:
    Create a .env file in the project root. Add the following line to the .env file: REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here

 - Update tmdb-api.js to use the environment variable: const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

Start the Development Server Run the following command to start the development server:
cd movies-api npm start
cd react-movies npm start

The application will run at http://localhost:3000

This setup will allow you to run and develop the project locally!

## API Configuration

Environment Configuration

Create a .env file in your project’s root directory (same level as package.json).
Add the following variables to it (use placeholder values). For example:

NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoDBConnectionURL
SEED_DB=true
SECRET=YourJWTSecret

- NODE_ENV: The environment mode your app runs in (e.g., development or production).
- PORT: The port your API server listens on (e.g., 8080).
- HOST: Typically your server host (often localhost during development).
- MONGO_DB: A valid MongoDB connection URI. Example format:

mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
Replace <username>, <password>, <cluster>, and <dbname> with the credentials for your Mongo instance.
SECRET: The JWT secret key used by the API to sign and verify tokens. Use a secure random string in production.

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies/all | GET | Retrieve a list of all movies stored in the local MongoDB database. 
- /api/movies/tmdb/:movieId | GET | Fetch details for a specific TMDB movie (by its ID) via backend.
- /api/users | POST | Login users.

## Security and Authentication
Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

Protected Routes
Movies:

GET /api/movies/all
GET /api/movies/tmdb/:movieId
(And any others under /api/movies)
These routes require a valid JWT; a request lacking the correct token will return an error (e.g., “No authorization header” or 401 Unauthorized).

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

Updated Pages

Home Page (homePage.js):
Displays local database movies (/api/movies/all) in one section.
Fetches a single TMDB movie via our own backend endpoint (/api/movies/tmdb/550) in another section.
Still shows the TMDB “discover” movies from the official API to compare side by side.

Login Page (loginPage.js):
A new view to POST user credentials to our local /api/users (login) and store a JWT in localStorage.
Ensures that subsequent requests to protected routes (like /api/movies/all) include the Authorization header.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   
