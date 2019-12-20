import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../views/home';
import About from '../views/about';

export default () => [
  <Route exact path="/" key="/" component={Home} />,
  <Route path="/about" key="/about" component={About} />,
];
