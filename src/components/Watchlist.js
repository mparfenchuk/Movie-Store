import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Icon from 'react-feather';
import { removeFromWatchlist } from '../actions/watchlist';

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
      
    const Movies = ({movies}) => (
        <div className="container">
          {movies.map((moviesRow, rowIndex) => {
            return (<div className="row" key={rowIndex}>
              {moviesRow.map((movie, index) => 
                <div className="col-md-3" key={index}>
                  <div className="card mb-4 box-shadow">
                      <img className="card-img-top" src={'https://image.tmdb.org/t/p/w500'+movie.poster} alt={movie.title}/>
                      <div className="card-body">
                          <h5 className="card-title">{movie.title+' '}<Icon.Eye onClick={this.doWatchlist.bind(this, movie)} className={(movie.inWatchlist) ? "watchlist added": "watchlist"}/></h5>
                          {movie.genres.map((genre, index)=>
                            <span className="badge badge-dark mr-2" key={index}>{genre}</span>
                          )}
                          <div className="mt-2">
                            <small className="text-muted">Rating:</small>
                            <div className="progress">
                              <div className={(movie.rating > 8) ? "progress-bar bg-success": (movie.rating < 6) ? "progress-bar bg-danger": "progress-bar bg-info"} role="progressbar" style={{width:movie.rating*10+'%'}} aria-valuenow={movie.rating} aria-valuemin="0" aria-valuemax="100">{movie.rating}%</div>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
              )}
            </div>);
          })}
        </div>
    ); 

    return (
      <div>
        <h1 className="h2">Watchlist</h1>
        <Movies movies={result}/>
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
