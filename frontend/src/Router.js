import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import HistoryComponent from './components/HistoryComponent/HistoryComponent';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/history' component={HistoryComponent} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
