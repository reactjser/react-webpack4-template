import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Routes from './config/router';

class App extends Component {
  render() {
    return (
      <>
        <div id='nav'>
          <NavLink exact to='/'>
            Home
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to='/about'>About</NavLink>
        </div>

        <Routes />
      </>
    );
  }
}

export default hot(App);
