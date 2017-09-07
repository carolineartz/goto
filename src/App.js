import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StickyContainer, Sticky } from 'react-sticky';
import '../node_modules/grommet-css';
import './App.css';

import { gamePlayAgain } from './actions/game';

import { App as GApp } from './components/grommet';
import GoogleMapsContainer from './components/containers/GoogleMapsContainer';
import HeaderContainer from './components/containers/HeaderContainer';
import ImageListContainer from './components/containers/ImageListContainer';
import Hero from './components/Hero';
import Footer from './components/Footer';
import GameSummaryOverlay from './components/GameSummaryOverlay';
import LoadMoreImages from './components/containers/LoadMoreImages';

const App = ({
  mode,
  gameStarted,
  rounds,
  summaryIsShown,
  score,
  playAgain
}) => (
  <GApp className={`${mode}-mode`} centered={false}>
    <Hero mode={mode} />
    <GoogleMapsContainer mode={mode} />
    <GameSummaryOverlay rounds={rounds} score={score} hidden={!summaryIsShown} onClickPlayAgain={playAgain} />
    <StickyContainer>
      <Sticky>
        { ({style}) => <HeaderContainer style={style} /> }
      </Sticky>
      { gameStarted && <ImageListContainer /> }
      { gameStarted && <LoadMoreImages /> }
      <Footer />
    </StickyContainer>
  </GApp>
);

App.propTypes = {
  mode: PropTypes.string.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  rounds: PropTypes.array.isRequired,
  summaryIsShown: PropTypes.bool.isRequired,
  playAgain: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

const select = (state, props) => ({
  mode: state.app.mode,
  gameStarted: state.game.started,
  rounds: state.game.summaryIsShown ? state.round.all : [],
  summaryIsShown: state.game.summaryIsShown,
  score: state.game.totalScore
});

const send = (dispatch) => ({
  playAgain: () => dispatch(gamePlayAgain())
});

export default connect(select, send)(App);
