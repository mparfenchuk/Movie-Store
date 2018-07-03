import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getPopularMovies } from '../actions/movies';
import Pagination from "react-js-pagination";
import Movies from './layout/Movies'

class Popular extends Component {
 
  constructor(props) {
    super(props)

    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(pageNumber) {

    let { getPopularMovies } = this.props;

    getPopularMovies(pageNumber);
  }

  componentDidMount(){

    let { getPopularMovies, activePagePopular } = this.props

    getPopularMovies(activePagePopular);
  }

  render() {

    let {moviesAreLoading, movies, totalMovies, activePagePopular} = this.props

    return (
      <div>
        <h1 className="h2">Popular</h1>
        {moviesAreLoading ? 
          <div className="loader mx-auto mt-2"></div>
        :   
        <div>
          <Movies type='popular' movies={movies}/>
          <nav className="mx-auto text-center" aria-label="Page navigation example">
              <Pagination
                activePage={activePagePopular}
                itemsCountPerPage={20}
                totalItemsCount={totalMovies}
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.onPageChange}
              />
            </nav>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies:state.movies.movies,
    moviesAreLoading:state.movies.moviesAreLoading,
    totalMovies:state.movies.totalMovies,
    activePagePopular:state.movies.activePagePopular
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getPopularMovies
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
