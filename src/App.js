import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StickyContainer, Sticky } from 'react-sticky';
import '../node_modules/grommet-css';
import './App.css';

import { gamePlayAgain, gameStart } from './actions/game';

import { App as GApp } from './components/grommet';
import GoogleMapsContainer from './components/containers/GoogleMapsContainer';
import HeaderContainer from './components/containers/HeaderContainer';
import ImageListContainer from './components/containers/ImageListContainer';
import Hero from './components/Hero';
import Footer from './components/Footer';
import GameSummaryOverlay from './components/GameSummaryOverlay';
import GameOverviewOverlay from './components/GameOverviewOverlay';
import LoadMoreImages from './components/containers/LoadMoreImages';

const App = ({
  gameStarted,
  mode,
  play,
  playAgain,
  rounds,
  score,
  summaryIsShown,
  overviewIsShown
}) => (
  <GApp className={`${mode}-mode`} centered={false}>
    <Hero mode={mode} />
    <GoogleMapsContainer mode={mode} />
    <GameSummaryOverlay mode={mode} rounds={rounds} score={score} hidden={!summaryIsShown} onClickPlayAgain={playAgain} />
    <GameOverviewOverlay mode={mode} hidden={!overviewIsShown} onClickPlay={play} />
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
  gameStarted: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  play: PropTypes.func.isRequired,
  playAgain: PropTypes.func.isRequired,
  rounds: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  summaryIsShown: PropTypes.bool.isRequired,
  overviewIsShown: PropTypes.bool.isRequired
};

const select = (state, props) => ({
  gameStarted: state.game.started,
  mode: state.app.mode,
  rounds: state.game.summaryIsShown ? state.round.all : [],
  score: state.game.totalScore,
  summaryIsShown: state.game.summaryIsShown,
  overviewIsShown: state.game.overviewIsShown,
});

const send = (dispatch, ownProps) => ({
  playAgain: () => dispatch(gamePlayAgain()),
  play: () => dispatch(gameStart())
});

export default connect(select, send)(App);
