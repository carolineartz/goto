import {
  gameHideMap,
  gameUpdateTotalScore,
  gameComplete
} from './game';

export const ROUND_CREATE = 'ROUND_CREATE';
export const ROUND_IMAGES_FETCH_FAILURE = 'ROUND_IMAGES_FETCH_FAILURE';
export const ROUND_START_NEXT = 'ROUND_START_NEXT';
export const ROUND_DROP_PIN = 'ROUND_DROP_PIN';
export const ROUND_MAKE_GUESS = 'ROUND_MAKE_GUESS';
export const ROUND_IMAGES_SET = 'ROUND_IMAGES_SET';
export const ROUND_UPDATE_GUESS = 'ROUND_UPDATE_GUESS';
export const ROUND_RESET = 'ROUND_RESET';

export const roundImagesSet = (round, images) => ({
  type: ROUND_IMAGES_SET,
  round,
  images: round.images
});

export const roundImagesFetchFailure = (error) => ({
  type: ROUND_IMAGES_FETCH_FAILURE,
  error
});

export const roundCreate = (round) => ({
  type: ROUND_CREATE,
  round
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

const _roundStartNext = (round) => ({
  type: ROUND_START_NEXT,
  currentRound: round
});

const _roundMakeGuess = (round) => ({
  type: ROUND_MAKE_GUESS,
  round
});

export const roundStartNext = (round) =>
  (dispatch) => {
    dispatch(gameHideMap());
    return dispatch(_roundStartNext(round));
  };

export const roundMakeGuess = (round, coordinates) =>
  (dispatch, getState) => {
    dispatch(_roundMakeGuess(round.setGuessCoordinates(coordinates)));
    dispatch(gameUpdateTotalScore(getState().round.current.score));
    if (round.number === 5) dispatch(gameComplete());
  };
