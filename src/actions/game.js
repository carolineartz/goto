import {
  roundCreate,
  roundImagesSet,
  roundImagesFetchFailure,
  roundReset
} from './round';

import { fetchPlaces, fetchImages } from './Api';
import { roundStartNext } from './round';

import Round from './../models/Round';

export const GAME_RESET = 'GAME_RESET';
export const GAME_PLACES_SET = 'GAME_PLACES_SET';
export const GAME_PLACES_FETCH_FAILURE = 'GAME_PLACES_FETCH_FAILURE';
export const GAME_CREATE_SUCCESS = 'GAME_CREATE_SUCCESS';
export const GAME_CREATE_FAILURE = 'GAME_CREATE_FAILURE';
export const GAME_OVERVIEW_DISPLAY = 'GAME_OVERVIEW_DISPLAY';
export const GAME_TOGGLE_SHOW_MAP = 'GAME_TOGGLE_SHOW_MAP';
export const GAME_SHOW_MAP = 'GAME_SHOW_MAP';
export const GAME_HIDE_MAP = 'GAME_HIDE_MAP';
export const GAME_START = 'GAME_START';
export const GAME_UPDATE_TOTAL_SCORE = 'GAME_UPDATE_TOTAL_SCORE';
export const GAME_COMPLETE = 'GAME_COMPLETE';
export const GAME_SHOW_SUMMARY = 'GAME_SHOW_SUMMARY';

export const gamePlacesSet = (places) => ({
  type: GAME_PLACES_SET,
  places
});

export const gamePlacesFetchFailure = (error) => ({
  type: GAME_PLACES_FETCH_FAILURE,
  error
});

export const gameOverviewDisplay = () => ({
  type: GAME_OVERVIEW_DISPLAY
});

export const gameToggleMap = () => ({
  type: GAME_TOGGLE_SHOW_MAP
});

export const gameShowMap = () => ({
  type: GAME_SHOW_MAP
});

export const gameHideMap = () => ({
  type: GAME_HIDE_MAP
});

const _gameStart = () => ({
  type: GAME_START
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

const gameReset = () => ({
  type: GAME_RESET
});

const gameCreateSuccess = () => ({
  type: GAME_CREATE_SUCCESS
});

const gameCreateFailure = (error) => ({
  type: GAME_CREATE_FAILURE,
  error
});

const getPlaces = () =>
  (dispatch) =>
    fetchPlaces()
      .then(
        places => dispatch(gamePlacesSet(places)),
        error => dispatch(gamePlacesFetchFailure(error))
      );

const getInitialRoundImages = (round) =>
  (dispatch) =>
    fetchImages(round.placeId, 10, 1)
      .then(
        images => dispatch(roundImagesSet(round, round.addImages(images))),
        error => dispatch(roundImagesFetchFailure(error))
      );

export const gameStart = () =>
  (dispatch) => {
    dispatch(_gameStart());
    dispatch(roundStartNext());
  };

export const gameCreate = () =>
  (dispatch, getState) =>
    dispatch(
      getPlaces()
    ).then(() =>
      Promise.all([
        getState().game.places.map((place, i) =>
          dispatch(roundCreate(new Round({place, number: i+1}))))
      ])
    ).then(() =>
      Promise.all([
        getState().round.all.map(round =>
          dispatch(getInitialRoundImages(round)))
      ])
    ).then(() => dispatch(gameCreateSuccess()))
      .catch(e => dispatch(gameCreateFailure(e)));

export const gamePlayAgain = () =>
  (dispatch) => (
    Promise.all([
      Promise.resolve(dispatch(roundReset())),
      Promise.resolve(dispatch(gameReset()))
    ])
  ).then((dispatch) => dispatch(gameCreate()));

