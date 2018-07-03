import React, { Component } from 'react';
import { connect } from 'react-redux'
import { removeFromWatchlist } from '../actions/watchlist';
import Movies from './layout/Movies'

class Watchlist extends Component {

  doWatchlist(movie) {

    let { dispatch } = this.props;
    
    return dispatch(removeFromWatchlist(movie));
  }

  render() {

    let { watchlistMovies } = this.props;

    let result = watchlistMovies.map((movie, index) => {
        return index % 4 === 0 ? watchlistMovies.slice(index, index + 4) : null;
      }).filter(movie => movie != null);
      
    return (
      <div>
        <h1 className="h2">Watchlist</h1>
        <Movies type='watchlist' movies={result}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    watchlistMovies:state.movies.watchlistMovies
  }
}

export default connect(mapStateToProps)(Watchlist);
