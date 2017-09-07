import { createReducer } from './utils';

import {
  GAME_CREATE_SUCCESS,
  GAME_CREATE_FAILURE,
  GAME_PLACES_SET,
  GAME_PLACES_FETCH_FAILURE,
  GAME_START,
  GAME_UPDATE_TOTAL_SCORE,
  GAME_COMPLETE,
  GAME_RESET,
  GAME_TOGGLE_SHOW_MAP,
  GAME_HIDE_MAP,
  GAME_SHOW_MAP,
  GAME_SHOW_OVERVIEW,
  GAME_HIDE_OVERVIEW,
  GAME_SHOW_SUMMARY,
  GAME_HIDE_SUMMARY,
} from '../actions/game';

const initialState = {
  numRounds: 5,
  places: [],
  completed: false,
  created: false,
  started: false,
  ready: false,
  totalScore: 0,
  mapIsShown: false,
  error: undefined,
  summaryIsShown: false,
  overviewIsShown: false
};

const handlers = {
  [GAME_PLACES_SET]: (state, action) => ({
    places: action.places,
  }),

  [GAME_START]: (state, action) => ({
    started: true
  }),

  [GAME_PLACES_FETCH_FAILURE]: (state, action) => ({
    error: action.error
  }),

  [GAME_CREATE_SUCCESS]: (state, action) => ({
    created: true
  }),

  [GAME_CREATE_FAILURE]: (state, action) => ({
    created: false,
    error: action.error
  }),

  [GAME_SHOW_MAP]: (state, action) => ({
    mapIsShown: true
  }),

  [GAME_HIDE_MAP]: (state, action) => ({
    mapIsShown: false
  }),

  [GAME_TOGGLE_SHOW_MAP]: (state, action) => ({
    mapIsShown: !state.mapIsShown
  }),

  [GAME_UPDATE_TOTAL_SCORE]: (state, action) => ({
    totalScore: state.totalScore + action.roundScore
  }),

  [GAME_COMPLETE]: (state, action) => ({
    completed: true
  }),

  [GAME_SHOW_SUMMARY]: (state, action) => ({
    summaryIsShown: true
  }),

  [GAME_HIDE_SUMMARY]: (state, action) => ({
    summaryIsShown: false
  }),

  [GAME_RESET]: (state, action) => ({
    ...initialState
  }),

  [GAME_SHOW_OVERVIEW]: (state, action) => ({
    overviewIsShown: true
  }),

  [GAME_HIDE_OVERVIEW]: (state, action) => ({
    overviewIsShown: false
  })
};

export default createReducer(initialState, handlers);
