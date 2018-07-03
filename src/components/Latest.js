import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getLatestMovies } from '../actions/movies';
import Pagination from "react-js-pagination";
import Movies from './layout/Movies'

class Latest extends Component {

  constructor(props) {
    super(props)

    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(pageNumber) {

    let { getLatestMovies } = this.props;

    getLatestMovies(pageNumber);
  }

  componentDidMount(){

    let { getLatestMovies, activePageLatest } = this.props;

    getLatestMovies(activePageLatest);

  }

  render() {

    let {moviesAreLoading, movies, totalMovies, activePageLatest} = this.props

    return (
      <div>
        <h1 className="h2">Latest</h1>
        {moviesAreLoading ? 
          <div className="loader mx-auto mt-2"></div>
        :   
          <div>
            <Movies type='latest' movies={movies}/>
            <nav className="mx-auto text-center" aria-label="Page navigation example">
              <Pagination
                activePage={activePageLatest}
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
    activePageLatest:state.movies.activePageLatest
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getLatestMovies
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Latest);
