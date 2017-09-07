import {
  gameHideMap,
  gameUpdateTotalScore,
  gameComplete
} from './game';

import { getRoundImages } from './Api';

export const ROUND_IMAGES_FETCH_FAILURE = 'ROUND_IMAGES_FETCH_FAILURE';
export const ROUND_START_NEXT = 'ROUND_START_NEXT';
export const ROUND_DROP_PIN = 'ROUND_DROP_PIN';
export const ROUND_MAKE_GUESS = 'ROUND_MAKE_GUESS';
export const ROUND_IMAGES_SET = 'ROUND_IMAGES_SET';
export const ROUND_IMAGES_SET_FAILURE = 'ROUND_IMAGES_SET_FAILURE';
export const ROUND_RESET = 'ROUND_RESET';
export const ROUND_IMAGES_LOAD_MORE = 'ROUND_IMAGES_LOAD_MORE';
export const ROUND_IMAGES_FETCH_SUCCESS = 'ROUND_IMAGES_FETCH_SUCCESS';
export const ROUND_DECREASE_POSSIBLE_POINTS = 'ROUND_DECREASE_POSSIBLE_POINTS';
export const ROUND_ALL_CREATE_SUCCESS = 'ROUND_ALL_CREATE_SUCCESS';
export const ROUND_ALL_CREATE_FAILURE = 'ROUND_ALL_CREATE_FAILURE';

export const roundAllCreateSuccess = (rounds) => ({
  type: ROUND_ALL_CREATE_SUCCESS,
  rounds
});

export const roundAllCreateFailure = (error) => ({
  type: ROUND_ALL_CREATE_FAILURE,
  error
});

export const roundImagesSet = (round, images) => ({
  type: ROUND_IMAGES_SET,
  round,
  images: round.images
});

export const roundImagesSetFailure = (error) => ({
  type: ROUND_IMAGES_SET_FAILURE,
  error
});

export const roundImagesFetchSuccess = (round, images) => ({
  type: ROUND_IMAGES_FETCH_SUCCESS,
  round,
  images
});

export const roundImagesFetchFailure = (error) => ({
  type: ROUND_IMAGES_FETCH_FAILURE,
  error
});

export const roundDropPin = (event) => ({
  coordinates: {
    latitude: event.latLng.lat(),
    longitude: event.latLng.lng()
  },
  type: ROUND_DROP_PIN
});

export const roundReset = () => ({
  type: ROUND_RESET
});

export const roundImagesLoadMore = (round) =>
  (dispatch, getState) =>
    getRoundImages(dispatch, round, 5, round.nextPageImagesNumber)
      .then(images => {
        dispatch({
          type: ROUND_IMAGES_LOAD_MORE,
          round: round.addImages(images)
        });
        return dispatch({
          type: ROUND_DECREASE_POSSIBLE_POINTS,
          round,
          possiblePoints: round.reducePossiblePoints()
        });
      });

export const roundMakeGuess = (round, coordinates) =>
  (dispatch, getState) => {
    dispatch({
      type: ROUND_MAKE_GUESS,
      round: round.setGuessCoordinates(coordinates)
    });
    if (round.number === getState().game.numRounds) dispatch(gameComplete());
    return dispatch(gameUpdateTotalScore(getState().round.current.score));
  };

export const roundStartNext = (round) =>
  (dispatch, getState) => {
    if (getState().game.mapIsShown) dispatch(gameHideMap());
    return dispatch({
      type: ROUND_START_NEXT,
      currentRound: round
    });
  };
