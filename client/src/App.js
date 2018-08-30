import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BeerList from './containers/BeerList/BeerList';
import FavoriteList from './containers/FavoriteList/FavoriteList';
import FullBeerItem from './containers/FullBeerItem/FullBeerItem';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
              <Route path="/favorites" component={FavoriteList} />
              <Route path="/fullbeerdesc" component={FullBeerItem} />
              <Route path="/" exact component={BeerList} />
              <Redirect from="/" to="/" />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
