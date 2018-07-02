import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPopularMovies } from '../actions/movies';

class Popular extends Component {
 
  componentDidMount(){

    let { getPopularMovies } = this.props

    getPopularMovies();

  }

  render() {

    let {moviesAreLoading, movies} = this.props

    const Movies = ({movies}) => (
      <div className="container">
        {movies.map((moviesRow, rowIndex) => {
          return (<div className="row" key={rowIndex}>
            {moviesRow.map((movie, index) => 
              <div className="col-md-3" key={index}>
                <Link to={"/movie/"+movie.id} className="card mb-4 box-shadow movie">
                    <img className="card-img-top" src={'https://image.tmdb.org/t/p/w500'+movie.poster} alt={movie.title}/>
                    <div className="card-body">
                        <h5 className="card-title">{movie.title+' '}</h5>
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
                </Link>
              </div>
            )}
          </div>);
        })}
      </div>
    ); 

    return (
      <div>
        <h1 className="h2">Popular</h1>
        {moviesAreLoading ? 
          <div className="loader mx-auto mt-2"></div>
        :   
          <Movies movies={movies}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies:state.movies.movies,
    moviesAreLoading:state.movies.moviesAreLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getPopularMovies
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
