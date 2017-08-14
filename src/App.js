import React, { Component } from 'react';

import '../node_modules/grommet-css';

import HeroMap from './components/HeroMap';
import MyHeader from './components/Header';
import Images from './components/Images';
import MyFooter from './components/Footer';

import './App.css';

import { App } from './components/grommet';

class MyApp extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      fixedHeader: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const mapHeight = window.innerHeight/2;
    const scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop >= mapHeight) this.setState({fixedHeader: true});
    else this.setState({fixedHeader: false})
  }

  render() {
    return (
      <App centered={false}>
        <HeroMap />
        <MyHeader
          fixed={this.state.fixedHeader}
          ref={(h) => this.header = h }
        />
        <Images />
        <MyFooter />
      </App>
    );
  }
}

export default MyApp;
