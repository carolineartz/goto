import React from 'react';
import { connect } from 'react-redux';

import { StickyContainer, Sticky } from 'react-sticky';
import '../node_modules/grommet-css';
import './App.css';

import { App } from './components/grommet';

import Hero from './components/Hero';
import MyHeader from './components/Header';
import Images from './components/Images';
import MyFooter from './components/Footer';

const MyApp = (props) => (
  <App className={`${props.mode}-mode`} centered={false}>
    <Hero />
    <StickyContainer>
      <Sticky>
        { ({style}) => <MyHeader style={style} /> }
      </Sticky>
      <Images />
      <MyFooter />
    </StickyContainer>
  </App>
);

const select = (state, props) => ({
  mode: state.app.mode
});

export default connect(select)(MyApp);
