import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  gameCreate,
  gameStart,
  gameOverviewDisplay,
  gameToggleMap,
  gameShowSummary
} from './../../actions/game';

import {
  roundStartNext,
  roundMakeGuess
} from './../../actions/round';

import Header from './../Header';

class HeaderContainer extends Component {
  componentWillMount() {
    this.props.createGame();
  }

  render() {
    return (
      <Header
        currentRound={this.props.currentRound}
        gameIsComplete={this.props.gameIsComplete}
        gameReady={this.props.gameReady}
        hasPin={this.props.hasPin}
        hasStarted={this.props.hasStarted}
        mapIsShown={this.props.mapIsShown}
        onClickNextRound={() => this.props.startNextRound({round: this.props.currentRound})}
        onClickOverview={() => this.props.showOverview()}
        onClickPlay={() => this.props.startGame()}
        onClickShowSummary={() => this.props.showSummary()}
        onClickSubmitGuess={() => this.props.hasPin ? this.props.makeGuess(this.props.currentRound, this.props.pinCoordinates) : null }
        onClickToggleShowMap={() => this.props.toggleShowMap()}
        roundIsComplete={this.props.roundIsComplete}
        roundPossiblePoints={this.props.possiblePoints}
        style={this.props.style}
        totalScore={this.props.totalScore}
      />
    );
  }
}

HeaderContainer.propTypes = {
  createGame: PropTypes.func.isRequired,
  currentRound: PropTypes.any,
  gameIsComplete: PropTypes.bool.isRequired,
  gameReady: PropTypes.bool.isRequired,
  hasPin: PropTypes.bool.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  makeGuess: PropTypes.func.isRequired,
  mapIsShown: PropTypes.bool.isRequired,
  pinCoordinates:PropTypes.any,
  possiblePoints: PropTypes.number.isRequired,
  roundIsComplete: PropTypes.bool.isRequired,
  showOverview: PropTypes.func.isRequired,
  showSummary: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  startNextRound: PropTypes.func.isRequired,
  style: PropTypes.any,
  toggleShowMap: PropTypes.func.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const select = (state, ownProps) => ({
  currentRound: state.round.current,
  gameIsComplete: state.game.completed,
  gameReady: state.round.allInitialImagesSet,
  hasPin: !!state.round.pinCoordinates,
  hasStarted: state.game.started,
  mapIsShown: state.game.mapIsShown,
  pinCoordinates: state.round.pinCoordinates,
  possiblePoints: state.round.possiblePoints,
  roundIsComplete: !!state.round.guessCoordinates,
  totalScore: state.game.totalScore,
});

const send = (dispatch) => ({
  createGame: () => dispatch(gameCreate()),
  makeGuess: (round, coordinates) => dispatch(roundMakeGuess(round, coordinates)),
  showOverview: () => dispatch(gameOverviewDisplay()),
  showSummary: () => dispatch(gameShowSummary()),
  startGame: () => dispatch(gameStart()),
  startNextRound: ({round}) => dispatch(roundStartNext(round)),
  toggleShowMap: () => dispatch(gameToggleMap()),
});

export default connect(select, send)(HeaderContainer);
