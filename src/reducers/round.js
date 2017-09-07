import { createReducer } from './utils';

import {
  ROUND_CREATE,
  ROUND_START_NEXT,
  ROUND_DROP_PIN,
  ROUND_MAKE_GUESS,
  ROUND_IMAGES_SET,
  ROUND_RESET,
  ROUND_IMAGES_FETCH_FAILURE,
  ROUND_IMAGES_FETCH_SUCCESS,
  ROUND_DECREASE_POSSIBLE_POINTS
} from '../actions/round';

const initialState = {
  current: undefined,
  markers: [],
  possiblePoints: 100,
  placeCoordinates: undefined,
  pinCoordinates: undefined,
  guessCoordinates: undefined,
  all: [],
  countImagesSetForRounds: 0,
  allInitialImagesSet: false,
  error: undefined
};

const handlers = {
  [ROUND_CREATE]: (state, action) => ({
    all: [...state.all, action.round]
  }),

  [ROUND_START_NEXT]: (state, action) => {
    const currentRoundNumber = state.current ? state.current.number : 0;
    const next = state.all.find(round => round.number === currentRoundNumber + 1);
    return {
      current: next,
      placeCoordinates: next.placeCoordinates,
      markers: [],
      possiblePoints: 100,
      pinCoordinates: undefined,
      guessCoordinates: undefined
    };
  },

  [ROUND_IMAGES_SET]: (state, action) => ({
    countImagesSetForRounds: state.countImagesSetForRounds + 1,
    allInitialImagesSet: state.countImagesSetForRounds === 4
  }),

  [ROUND_DROP_PIN]: (state, action) => ({
    pinCoordinates: action.coordinates,
    markers: [{
      type: 'guess',
      position: {
        lat: action.coordinates.latitude,
        lng: action.coordinates.longitude
      }
    }]
  }),

  [ROUND_MAKE_GUESS]: (state, action) => ({
    guessCoordinates: state.pinCoordinates,
    markers: [...state.markers, {
      type: 'place',
      position: {
        lat: state.placeCoordinates.latitude,
        lng: state.placeCoordinates.longitude
      }
    }]
  }),

  [ROUND_RESET]: (state, action) => ({
    ...initialState
  }),

  [ROUND_IMAGES_FETCH_SUCCESS]: (state, action) => ({
    ...state
  }),

  [ROUND_IMAGES_FETCH_FAILURE]: (state, action) => ({
    error: action.error
  }),

  [ROUND_DECREASE_POSSIBLE_POINTS]: (state, action) => ({
    possiblePoints: action.possiblePoints
  })
};

export default createReducer(initialState, handlers);
