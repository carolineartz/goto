import {
  ROUND_CREATED,
  ROUND_LOCATION_INFO_FETCHING,
  ROUND_SELECT_MAP_LOCATION,
  ROUND_GUESS_LOCATION,
  ROUND_DECREASE_POSSIBLE_POINTS
} from '../actions/rounds';

import { createReducer } from './utils';

import { calculateScore, calculateDistanceInMiles } from './../models/scoring';

const initialState = {
  currentPlaceId: null,
  roundStarted: false,
  nextRoundIndex: 0,
  all: [],
  currentRound: {place: {place: {}}},
  displayTarget: false,
  displayGuess: false,
  guessCoordinates: {},
  targetCoordinates: {},
  distance: undefined,
  guessMarker: {type: 'guess', position: undefined},
  targetMarker: {type: 'target', position: undefined},
  markers: [],
  totalScore: 0,
  roundScore: 0,
  hasRoundScore: false,
  roundPossiblePoints: 100
};

const handlers = {
  [ROUND_LOCATION_INFO_FETCHING]: (state, action) => {
    const round = {number: state.nextRoundIndex + 1, placeId: action.placeId};
    return {
      currentPlaceId: action.placeId,
      roundStarted: false,
      nextRoundIndex: state.nextRoundIndex + 1,
      all: [round, ...state.all],
      markers: []
    };
  },

  [ROUND_CREATED]: (state, action) => {
    const [round, ..._previousRounds] = state.all; // eslint-disable-line
    round.place = action.place;
    return {
      all: state.all,
      roundStarted: true,
      currentRound: round,
      displayTarget: false,
      displayGuess: false,
      markers: [],
      hasRoundScore: false,
      roundScore: 0,
      roundPossiblePoints: 100
    };
  },

  [ROUND_SELECT_MAP_LOCATION]: (state, action) => {
    const guessCoordinates = action.guessCoordinates;
    const guessMarker = {type: 'guess', position: {lat: guessCoordinates.latitude, lng: guessCoordinates.longitude}};

    return {
      guessCoordinates,
      markers: [guessMarker]
    };
  },

  [ROUND_GUESS_LOCATION]: (state, action) => {
    if (!state.targetCoordinates.latitude && !state.guessCoordinates.latitude) {
      return {};
    }
    const { targetCoordinates, guessCoordinates } = action;
    const distance = calculateDistanceInMiles({targetCoordinates, guessCoordinates});
    const guessMarker = {type: 'guess', position: {lat: guessCoordinates.latitude, lng: guessCoordinates.longitude}};
    const targetMarker = {type: 'target', position: {lat: targetCoordinates.latitude, lng: targetCoordinates.longitude}};
    const markers = [targetMarker, guessMarker];
    const roundScore = calculateScore({distance, possiblePoints: state.roundPossiblePoints});

    return {
      distance,
      displayTarget: true,
      targetCoordinates,
      guessCoordinates,
      markers,
      roundScore,
      hasRoundScore: true,
      totalScore: state.totalScore + roundScore
    };
  },

  [ROUND_DECREASE_POSSIBLE_POINTS]: (state, action) => ({
    roundPossiblePoints: state.roundPossiblePoints - 10
  })
};

export default createReducer(initialState, handlers);
