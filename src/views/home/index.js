import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logo from '../../assets/logo.svg';
import HelloWorld from '../../components/HelloWorld';
import { ASYNC_ADD } from '../../store/constants';

@connect(
  state => ({
    count: state.count,
  }),
  dispatch => ({
    add: () => {
      dispatch({
        type: ASYNC_ADD,
      });
    },
  }),
)
class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.add();
  }

  render() {
    return (
      <div className="home">
        <div onClick={this.handleClick}>{this.props.count}</div>
        <img alt="Vue logo" src={Logo} width="200" height="200" />
        <HelloWorld msg="Welcome to Your React.js App" />
      </div>
    );
  }
}

export default Home;
