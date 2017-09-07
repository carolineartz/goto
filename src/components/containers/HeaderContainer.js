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
        onClickPlay={() => this.props.startGame()}
        onClickNextRound={() => this.props.startNextRound({round: this.props.currentRound})}
        onClickOverview={() => this.props.showOverview()}
        onClickSubmitGuess={() => this.props.hasPin ? this.props.makeGuess(this.props.currentRound, this.props.pinCoordinates) : null }
        onClickToggleShowMap={() => this.props.toggleShowMap()}
        onClickShowSummary={() => this.props.showSummary()}
        currentRound={this.props.currentRound}
        hasPin={this.props.hasPin}
        hasStarted={this.props.hasStarted}
        roundIsComplete={this.props.roundIsComplete}
        gameIsComplete={this.props.gameIsComplete}
        mapIsShown={this.props.mapIsShown}
        style={this.props.style}
        roundPossiblePoints={this.props.possiblePoints}
        totalScore={this.props.totalScore}
        gameReady={this.props.gameReady}
      />
    );
  }
}

HeaderContainer.propTypes = {
  startGame: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  showOverview: PropTypes.func.isRequired,
  makeGuess: PropTypes.func.isRequired,
  toggleShowMap: PropTypes.func.isRequired,
  showSummary: PropTypes.func.isRequired,
  currentRound: PropTypes.any,
  startNextRound: PropTypes.func.isRequired,
  possiblePoints: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  pinCoordinates:PropTypes.any,
  roundIsComplete: PropTypes.bool.isRequired,
  hasPin: PropTypes.bool.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  gameIsComplete: PropTypes.bool.isRequired,
  mapIsShown: PropTypes.bool.isRequired,
  gameReady: PropTypes.bool.isRequired,
  style: PropTypes.any
};

const select = (state, ownProps) => ({
  currentRound: state.round.current,
  roundIsComplete: !!state.round.guessCoordinates,
  hasPin: !!state.round.pinCoordinates,
  pinCoordinates: state.round.pinCoordinates,
  possiblePoints: state.round.possiblePoints,
  hasStarted: state.game.started,
  totalScore: state.game.totalScore,
  mapIsShown: state.game.mapIsShown,
  gameReady: state.round.allInitialImagesSet,
  gameIsComplete: state.game.completed
});

const send = (dispatch) => ({
  createGame: () => dispatch(gameCreate()),
  showOverview: () => dispatch(gameOverviewDisplay()),
  startNextRound: ({round}) => dispatch(roundStartNext(round)),
  makeGuess: (round, coordinates) => dispatch(roundMakeGuess(round, coordinates)),
  toggleShowMap: () => dispatch(gameToggleMap()),
  startGame: () => dispatch(gameStart()),
  showSummary: () => dispatch(gameShowSummary())
});

export default connect(select, send)(HeaderContainer);
