import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Icon from 'react-feather';
import { add, remove } from '../../actions/watchlist';

class Movie extends Component {
 

  doWatchlist() {

    let { movie, remove, add } = this.props;

    let targetMovie;

    if(movie.inWatchlist){
      targetMovie = Object.assign({}, movie, {
        inWatchlist: false
      });

    } else {
      targetMovie = Object.assign({}, movie, {
        inWatchlist: true
      });
    }
    
    if (!targetMovie.inWatchlist){
      return remove({'movie':targetMovie});
    } else {
      return add({'movie':targetMovie});
    }
    
  }

  render() {

    let {movie} = this.props

    return (
      <div className="card mb-4 box-shadow">
        <div className="row">
          <div className="col-md-4">
            <img className="img-fluid" src={movie.poster !== null ? 'https://image.tmdb.org/t/p/w500'+movie.poster : 'https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg'} alt={movie.title}/>
          </div>
          <div className="col-md-8">
            <div className="card-body align-items-start">
                <h5 className="card-title">{movie.title+' '}<Icon.Eye onClick={this.doWatchlist.bind(this)} className={(movie.inWatchlist) ? "watchlist added": "watchlist"}/></h5>
                {movie.genres.map((genre, index)=>
                  <span className="badge badge-dark mr-2" key={index}>{genre}</span>
                )}
                <p className="card-text mt-2">{movie.overview}</p>
                <div className="mt-2">
                  <small className="text-muted">Rating:</small>
                  <div className="progress col-6 pl-0 pr-0">
                    <div className={(movie.rating > 8) ? "progress-bar bg-success": (movie.rating < 6) ? "progress-bar bg-danger": "progress-bar bg-info"} role="progressbar" style={{width:movie.rating*10+'%'}} aria-valuenow={movie.rating} aria-valuemin="0" aria-valuemax="100">{movie.rating}%</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  add,
  remove
}, dispatch)

export default connect(null, mapDispatchToProps)(Movie);