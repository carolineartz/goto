import React from 'react';

import { StickyContainer, Sticky } from 'react-sticky';
import '../node_modules/grommet-css';
import './App.css';

import { App } from './components/grommet';

import Hero from './components/Hero';
import MyHeader from './components/Header';
import Images from './components/Images';
import MyFooter from './components/Footer';

const MyApp = () => (
  <App centered={false}>
    <Hero />
    <StickyContainer>
      <Sticky>
        { ({style}) => <MyHeader style={style} /> }
      </Sticky>
      <Images />
      <MyFooter />
    </StickyContainer>
  </App>
)

export default MyApp;
