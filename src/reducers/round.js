import { createReducer } from './utils';

import {
  ROUND_CREATE,
  ROUND_START_NEXT,
  ROUND_DROP_PIN,
  ROUND_MAKE_GUESS,
  ROUND_IMAGES_SET,
  ROUND_RESET
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
  allInitialImagesSet: false
};

const handlers = {
  [ROUND_CREATE]: (state, action) => ({
    current: action.round.number === 1 ? action.round : state.current,
    placeCoordinates: state.placeCoordinates ? state.placeCoordinates : action.round.place.coordinates,
    all: [...state.all, action.round]
  }),

  [ROUND_START_NEXT]: (state, action) => {
    const current = state.current;
    const next = state.all.find(round => round.number === current.number + 1);
    return {
      current: next,
      placeCoordinates: next.place.coordinates,
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
  })
};

export default createReducer(initialState, handlers);
