import * as constants from '../constants';

if(localStorage.getItem('watchlistMovies') === null){
  localStorage.setItem('watchlistMovies', JSON.stringify([]));
}

const initialState = {  
  movies:[],
  watchlistMovies:JSON.parse(localStorage.getItem('watchlistMovies'))
}
  
const moviesReducer = (state = initialState, action) => {
    if (action.type === constants.SET_POPULAR)
    {
      return Object.assign({}, state, {   
        movies: action.payload,
        watchlistMovies: state.watchlistMovies
      })
    }

    if (action.type === constants.SET_LATEST)
    {
      return Object.assign({}, state, {   
        movies: action.payload,
        watchlistMovies: state.watchlistMovies
      })
    }

    if (action.type === constants.ADD_TO_WATCHLIST)
    {

      let newList = [...state.watchlistMovies, action.payload.movie];

      localStorage.setItem('watchlistMovies', JSON.stringify(newList));

      return Object.assign({}, state, { 
        movies: action.payload.movies,
        watchlistMovies: newList
      })
    }

    if (action.type === constants.REMOVE_FROM_WATCHLIST)
    {

      let newList = state.watchlistMovies.filter(movie => movie.id !== action.payload.movie.id);

      localStorage.setItem('watchlistMovies', JSON.stringify(newList));

      return Object.assign({}, state, {  
        movies: action.payload.movies,
        watchlistMovies: newList
      })
    }

    if (action.type === constants.REMOVE_FROM_WATCHLIST_FROM_WATCHLIST)
    {

      let newList = state.watchlistMovies.filter(movie => movie !== action.payload);

      localStorage.setItem('watchlistMovies', JSON.stringify(newList));

      return Object.assign({}, state, {  
        movies: state.movies,
        watchlistMovies: newList
      })
    }
  
    return state
  }
  
export default moviesReducer