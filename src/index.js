import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
// Redux Store
import store, { history } from './store'

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
    </ConnectedRouter>
  </Provider>
  ),
  document.getElementById('root')
);

registerServiceWorker();
