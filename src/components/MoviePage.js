import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMovie } from '../actions/movies';
import Movie from './layout/Movie'

class MoviePage extends Component {


  componentDidMount(){

    let { getMovie } = this.props;

    getMovie(parseInt(this.props.match.params.movieId, 10));

  }

  render() {

    let {movieIsLoading, movieHasError, movie} = this.props

    return (
      <div>
        {movieIsLoading ? 
          <div className="loader mx-auto mt-2"></div>
        :   
          movieHasError !== null ?
            <h1>{movieHasError}</h1>
          :
            movie !== null ?

            <Movie movie={movie} />
            :
            null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie:state.movies.movie,
    movieIsLoading:state.movies.movieIsLoading,
    movieHasError:state.movies.movieHasError
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMovie
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
