import * as constants from '../constants';

if(localStorage.getItem('watchlistMovies') === null){
  localStorage.setItem('watchlistMovies', JSON.stringify([]));
}

const initialState = {
  moviesAreLoading: false,
  movieIsLoading: false,
  movieHasError:null,
  movie:null,
  movies:[],
  searchIsLoading:false,
  search:[],
  watchlistMovies:JSON.parse(localStorage.getItem('watchlistMovies'))
}
  
const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_POPULAR:{
      return {
        ...state,
        moviesAreLoading: false,
        movies: action.payload
      }
    }
    case constants.SET_LATEST:{
      return {
        ...state,
        moviesAreLoading: false,
        movies: action.payload
      }
    }
    case constants.SET_SEARCH:{
      return {
        ...state,
        searchIsLoading: false,
        search: action.payload
      }
    }
    case constants.SET_MOVIE:{
      return {
        ...state,
        movieIsLoading: false,
        movieHasError: null,
        movie: action.payload
      }
    }
    case constants.MOVIES_ARE_LOADING:{
      return {
        ...state,
        moviesAreLoading: true
      }
    }
    case constants.SEARCH_IS_LOADING:{
      return {
        ...state,
        searchIsLoading: true
      }
    }
    case constants.CLEAR_SEARCH:{
      return {
        ...state,
        searchIsLoading: false,
        search:[]
      }
    }
    case constants.MOVIE_IS_LOADING:{
      return {
        ...state,
        movieIsLoading: true
      }
    }
    case constants.MOVIE_HAS_ERROR:{
      return {
        ...state,
        movieHasError: action.payload,
        movieIsLoading: false
      }
    }
    case constants.ADD_TO_WATCHLIST:{

      let newList = [...state.watchlistMovies, action.payload.movie];

      localStorage.setItem('watchlistMovies', JSON.stringify(newList));

      return {
        ...state,
        movie: action.payload.movie,
        watchlistMovies: newList
      }
    }
    case constants.REMOVE_FROM_WATCHLIST:{

      let newList = state.watchlistMovies.filter(movie => movie.id !== action.payload.movie.id);

      localStorage.setItem('watchlistMovies', JSON.stringify(newList));

      return {
        ...state,
        movie: action.payload.movie,
        watchlistMovies: newList
      }
    }
    case constants.REMOVE_FROM_WATCHLIST_FROM_WATCHLIST:{

      let newList = state.watchlistMovies.filter(movie => movie !== action.payload);

      localStorage.setItem('watchlistMovies', JSON.stringify(newList));

      return {
        ...state,
        watchlistMovies: newList
      }
    }
    default:
      return state;
  }
}
  
export default moviesReducer