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

function setMovie(results) {
  return {
    type: constants.SET_MOVIE,
    payload: results
  }
}

function moviesAreLoading() {
  return {
      type: constants.MOVIES_ARE_LOADING
  };
}

function movieIsLoading() {
  return {
      type: constants.MOVIE_IS_LOADING
  };
}

function movieHasError(results) {
  return {
    type: constants.MOVIE_HAS_ERROR,
    payload: results
  }
}

function setSearchResult(results) {
  return {
    type: constants.SET_SEARCH,
    payload: results
  }
}

function searchIsLoading() {
  return {
      type: constants.SEARCH_IS_LOADING
  };
}

export function clearSearch(){
  return {
    type: constants.CLEAR_SEARCH
  };
}

function getGenres() {
  return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US');
}

function getPopular(page) {
  return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US&page='+page);
}

function getLatest(page) {
  return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US&page='+page);
}

function getSearch(query) {
  return axios.get('https://api.themoviedb.org/3/search/movie?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US&query='+query+'&page=1&include_adult=false');
}

export function doSearch(query) {

  return function(dispatch) {

    dispatch(searchIsLoading());
    
    let movies = [];

    axios.all([getGenres(), getSearch(query)])
    .then(axios.spread(function (genres, search) {
      
      search.data.results.forEach(element => {

        let genresTitles = genres.data.genres.map((genre, index) => {
          return element.genre_ids.includes(genre.id) ? genre.name : null;
        }).filter(genre => genre != null);

        movies.push({'id':element.id, 'title' : element.title, 'rating': element.vote_average, 'genres': genresTitles}); 
      });

      let result = movies.map((movie, index) => {
        return index % 2 === 0 ? movies.slice(index, index + 2) : null;
      }).filter(movie => movie != null);

      return dispatch(setSearchResult(
        result
      ));

    })).catch(function (error) {
      console.log(error);
    });
  }
}

export function getMovie(movieId) {

  return function(dispatch) {

    dispatch(movieIsLoading());
    
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=79d36b7841b090ecd252b160c9f3d79d&language=en-US')
    .then(function (movieInfo) {

      let genresTitles = movieInfo.data.genres.map((genre, index) => {
        return genre.name;
      }).filter(genre => genre != null);

      let inWatchlist = false;

      JSON.parse(localStorage.getItem('watchlistMovies')).forEach(e => {

        if (e.id === movieInfo.data.id){
          inWatchlist = true ;
        }
      }); 

      return dispatch(setMovie(
        {'id':movieInfo.data.id, 'title' : movieInfo.data.title, 'overview': movieInfo.data.overview, 'poster': movieInfo.data.poster_path, 'rating': movieInfo.data.vote_average, 'genres': genresTitles, 'inWatchlist': inWatchlist}
      ));

    }).catch(function (error) {
      
      console.log(error);
      return dispatch(movieHasError(error.message));
    });
  }
}

export function getPopularMovies(page) {

  return function(dispatch) {

    dispatch(moviesAreLoading());

    let movies = [];

    axios.all([getGenres(), getPopular(page)])
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
        {'activePagePopular':page,'totalMovies':popular.data.total_results, 'movies':result}
      ));

    })).catch(function (error) {
      console.log(error);
    });
  }
}

export function getLatestMovies(page) {
  
  return function(dispatch) {

    dispatch(moviesAreLoading());

    let movies = [];

    axios.all([getGenres(), getLatest(page)])
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
        {'activePageLatest':page,'totalMovies':latest.data.total_results, 'movies':result}
      ));

    })).catch(function (error) {
      console.log(error);
    });
  }
}
