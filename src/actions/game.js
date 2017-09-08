import disableScroll from 'disable-scroll';
import { roundReset, roundStartNext } from './round';
import { getPlaces, createRounds, setRoundsInitialImages } from './Api';

export const GAME_COMPLETE = 'GAME_COMPLETE';
export const GAME_CREATE_FAILURE = 'GAME_CREATE_FAILURE';
export const GAME_CREATE_SUCCESS = 'GAME_CREATE_SUCCESS';
export const GAME_HIDE_MAP = 'GAME_HIDE_MAP';
export const GAME_SHOW_OVERVIEW = 'GAME_SHOW_OVERVIEW';
export const GAME_PLACES_FETCH_FAILURE = 'GAME_PLACES_FETCH_FAILURE';
export const GAME_PLACES_SET = 'GAME_PLACES_SET';
export const GAME_RESET = 'GAME_RESET';
export const GAME_SHOW_MAP = 'GAME_SHOW_MAP';
export const GAME_SHOW_SUMMARY = 'GAME_SHOW_SUMMARY';
export const GAME_START = 'GAME_START';
export const GAME_TOGGLE_SHOW_MAP = 'GAME_TOGGLE_SHOW_MAP';
export const GAME_UPDATE_TOTAL_SCORE = 'GAME_UPDATE_TOTAL_SCORE';
export const GAME_HIDE_OVERVIEW = 'GAME_HIDE_OVERVIEW';
export const GAME_HIDE_SUMMARY = 'GAME_HIDE_SUMMARY';

export const gamePlacesFetchSuccess = (places) => ({
  type: GAME_PLACES_SET,
  places
});

export const gamePlacesFetchFailure = (error) => ({
  type: GAME_PLACES_FETCH_FAILURE,
  error
});

export const gameShowOverview = () =>
  (dispatch) => {
    disableScroll.on();
    dispatch({type: GAME_SHOW_OVERVIEW});
  };

export const gameHideOverview = () =>
  (dispatch) => {
    disableScroll.off();
    dispatch({type: GAME_HIDE_OVERVIEW});
  };

export const gameToggleMap = () => ({
  type: GAME_TOGGLE_SHOW_MAP
});

export const gameShowMap = () => ({
  type: GAME_SHOW_MAP
});

export const gameHideMap = () => ({
  type: GAME_HIDE_MAP
});

export const gameUpdateTotalScore = (roundScore) => ({
  type: GAME_UPDATE_TOTAL_SCORE,
  roundScore
});

export const gameComplete = () => ({
  type: GAME_COMPLETE
});

export const gameShowSummary = () => ({
  type: GAME_SHOW_SUMMARY
});

export const gameCreate = () =>
  (dispatch, getState) =>
    getPlaces(dispatch, getState, getState().game.numRounds)
      .then(() => createRounds(dispatch, getState))
      .then(() => setRoundsInitialImages(dispatch, getState))
      .then(() => dispatch({type: GAME_CREATE_SUCCESS}))
      .catch((e) => dispatch({type: GAME_CREATE_FAILURE, error: e}));

export const gameStart = () =>
  (dispatch, getState) => {
    if (getState().game.overviewIsShown) dispatch(gameHideOverview());
    dispatch(roundStartNext());
    dispatch({type: GAME_START});
  };

export const gamePlayAgain = () =>
  (dispatch) =>
    Promise.all([
      Promise.resolve(dispatch(roundReset())),
      Promise.resolve(dispatch({type: GAME_RESET})),
      Promise.resolve(dispatch({type: GAME_HIDE_SUMMARY})) // not actually needed...
    ]).then(() => dispatch(gameCreate()));
