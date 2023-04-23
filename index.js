//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); // load dnv file and take clint ID

const trakt = require("./modules/trakt/api");
const { request } = require("http");
const { response } = require("express");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  let moviesList = await trakt.getTrendingMovies();
  console.log(moviesList);
  response.render("index", { title: "Movies", movies: moviesList });
});
app.get("/movie-info", async (request, response) => {
  let rating = await trakt.getMovieRating(request.query.id);
  response.render("movie", { title: "About movie", rating: rating });
});
app.get("/show", async (request, response) => {
  let shows = await trakt.getPopularShows();
  console.log(shows);
  response.render("show", { title: "Shows", show: shows });
});
//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});