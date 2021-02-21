import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
// import { HashRouter as Router } from 'react-router-dom';

export default class Root extends Component {
  get content() {
    return (
      <Router {...this.props}/>
    );
  }

  render() {
    return (
      <Provider store={this.props.store}>
        {/* <Router {...this.props} /> */}
        {this.content}
        {/* <App /> */}
      </Provider>
    );
  }
}