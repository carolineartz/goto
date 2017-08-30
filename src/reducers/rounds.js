import { createReducer } from './utils';

import {
  ROUND_CREATED,
  ROUND_LOCATION_INFO_FETCHING,
  ROUND_SELECT_MAP_LOCATION,
  ROUND_GUESS_LOCATION,
  ROUND_DECREASE_POSSIBLE_POINTS,
  ROUND_INITIALIZE
} from '../actions/rounds';

import Round from './../models/Round';


const initialState = {
  current: new Round({number: 0}),
  all: [],
  displayTarget: false,
  displayGuess: false,
  totalScore: 0
};

const handlers = {
  [ROUND_INITIALIZE]: (state, action) => {
    const round = state.current.next();

    return {
      current: round,
      number: round.number
    };
  },

  [ROUND_LOCATION_INFO_FETCHING]: (state, action) => {
    const round = state.current;
    round.place.externalId = action.placeId;

    return {
      current: round,
      placeId: action.placeId,
      all: [round, ...state.all]
    };
  },

  [ROUND_CREATED]: (state, action) => {
    const round = state.current;
    const place = round.place;
    round.advanceStatus();

    place.latitude = action.place.place.latitude;
    place.longitude = action.place.place.longitude;
    place.name = action.place.place.name;
    return { current: round };
  },

  [ROUND_SELECT_MAP_LOCATION]: (state, action) => {
    const round = state.current;
    const guess = round.guess;

    guess.latitude = action.guessCoordinates.latitude;
    guess.longitude = action.guessCoordinates.longitude;
    return { current: round };
  },

  [ROUND_GUESS_LOCATION]: (state, action) => {
    const round = state.current;
    round.advanceStatus();
    return {
      current: round,
      totalScore: state.totalScore + round.score
    };
  },

  [ROUND_DECREASE_POSSIBLE_POINTS]: (state, action) => {
    const round = state.current;
    round.reducePossiblePoints();
    return {
      current: round
    };
  }
};

export default createReducer(initialState, handlers);
