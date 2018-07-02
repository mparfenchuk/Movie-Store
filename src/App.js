import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Icon from 'react-feather';
import { doSearch, clearSearch } from './actions/movies';
import Popular from './components/Popular';
import Latest from './components/Latest';
import Watchlist from './components/Watchlist';
import Movie from './components/Movie';

import './App.css';

class App extends Component {
 
  constructor(props) {
    super(props)

    this.state = {
      searchInput: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {

    let { doSearch, clearSearch } = this.props;

    let {searchInput} = this.state;
  
    this.setState({
      searchInput: event.target.value.toLowerCase()
    }, () => {
      if (searchInput && searchInput.length > 1) {
        if (searchInput.length % 2 === 0) {
          doSearch(searchInput);
        }
      } else {
        clearSearch();
      }
    })
  }

  render() {

    let {pathname, searchIsLoading, search} = this.props;

    const Movies = ({movies}) => (
      <div className="container">
        {movies.map((moviesRow, rowIndex) => {
          return (<div className="row" key={rowIndex}>
            {moviesRow.map((movie, index) => 
              <div className="col-md-6" key={index}>
                <Link to={"/movie-store/movie/"+movie.id} target="_blank" className="card mb-4 box-shadow movie">
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        {movie.genres.map((genre, index)=>
                          <span className="badge badge-dark mr-2" key={index}>{genre}</span>
                        )}
                        <div className="mt-2">
                          <small className="text-muted">Rating:</small>
                          <div className="progress col-6 pl-0 pr-0">
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
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0" >Movie Store</div>
          <input className="form-control form-control-dark w-100"  onChange={this.onInputChange}
          value={this.state.searchInput} type="text" placeholder="Search" aria-label="Search"/>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/movie-store/latest" className={(pathname === '/movie-store/latest') ? "nav-link active" : "nav-link"}>
                        <Icon.Clock className="feather"/><br/>
                        LATEST {(pathname === '/movie-store/latest') ? <span className="sr-only">(current)</span> : ""}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/movie-store/popular" className={(pathname === '/movie-store/popular') ? "nav-link active" : "nav-link"}>
                      <Icon.Star className="feather"/><br/>
                      POPULAR {(pathname === '/movie-store/popular') ? <span className="sr-only">(current)</span> : ""}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/movie-store/watchlist" className={(pathname === '/movie-store/watchlist') ? "nav-link active" : "nav-link"}>
                      <Icon.Menu className="feather"/><br/>
                      WATCHLIST {(pathname === '/movie-store/watchlist') ? <span className="sr-only">(current)</span> : ""}
                    </Link>
                  </li>
                </ul> 
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              {searchIsLoading ? 
                <div className="loader mx-auto mt-2"></div>
              :   
                <Movies movies={search}/>
              }
              <Switch>
                <Redirect exact from='/movie-store/' to='/movie-store/latest'/>
                <Route exact path="/movie-store/latest" component={Latest} />
                <Route exact path="/movie-store/popular" component={Popular} />             
                <Route exact path="/movie-store/watchlist" component={Watchlist} />
                <Route path='/movie-store/movie/:movieId' component={Movie}/>
                <Route component={()=>(<div><h1>Not Found 404</h1></div>)} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies:state.movies.movies,
    search:state.movies.search,
    searchIsLoading:state.movies.searchIsLoading,
    pathname: state.router.location.pathname,
    watchlistMovies:state.movies.watchlistMovies
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  doSearch,
  clearSearch
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);

