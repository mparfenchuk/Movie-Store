import * as constants from '../constants';
import axios from 'axios';

function setPopular(results) {
  return {
    type: constants.SET_POPULAR,
    payload: results
  }
}

function setLatest(results) {
  return {
    type: constants.SET_LATEST,
    payload: results
  }
}

function getGenres() {
  return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US');
}

function getPopular() {
  return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US&page=1s');
}

function getLatest() {
  return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US&page=1');
}

export function getPopularMovies() {

  return function(dispatch) {

    let movies = [];

    axios.all([getGenres(), getPopular()])
    .then(axios.spread(function (genres, popular) {
      
      popular.data.results.forEach(element => {

        let genresTitles = genres.data.genres.map((genre, index) => {
          return element.genre_ids.includes(genre.id) ? genre.name : null;
        }).filter(genre => genre != null);

        let inWatchlist = false;

        JSON.parse(localStorage.getItem('watchlistMovies')).forEach(e => {

          if (e.id === element.id){
            inWatchlist = true ;
          }
        }); 

        movies.push({'id':element.id, 'title' : element.title, 'poster': element.poster_path, 'rating': element.vote_average, 'genres': genresTitles, 'inWatchlist': inWatchlist}); 
      });

      let result = movies.map((movie, index) => {
        return index % 4 === 0 ? movies.slice(index, index + 4) : null;
      }).filter(movie => movie != null);

      return dispatch(setPopular(
        result
      ));

    })).catch(function (error) {
      console.log(error);
    });
  }
}

export function getLatestMovies() {

  return function(dispatch) {

    let movies = [];

    axios.all([getGenres(), getLatest()])
    .then(axios.spread(function (genres, latest) {
      
      latest.data.results.forEach(element => {

        let genresTitles = genres.data.genres.map((genre, index) => {
          return element.genre_ids.includes(genre.id) ? genre.name : null;
        }).filter(genre => genre != null);

        let inWatchlist = false;

        JSON.parse(localStorage.getItem('watchlistMovies')).forEach(e => {
 
          if (e.id === element.id){
            inWatchlist = true ;
          }
        }); 

        movies.push({'id':element.id, 'title' : element.title, 'poster': element.poster_path, 'rating': element.vote_average, 'genres': genresTitles, 'inWatchlist': inWatchlist}); 
      });

      let result = movies.map((movie, index) => {
        return index % 4 === 0 ? movies.slice(index, index + 4) : null;
      }).filter(movie => movie != null);

      return dispatch(setLatest(
        result
      ));

    })).catch(function (error) {
      console.log(error);
    });
  }
}
