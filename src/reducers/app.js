import { createReducer } from './utils';

import {
  APP_CHANGE_MODE,
  DARK
} from '../actions/app';

const initialState = {
  mode: localStorage.getItem('mode') || DARK
};

const handlers = {
  [APP_CHANGE_MODE]: (state, action) => ({
    mode: action.toMode
  })
};

export default createReducer(initialState, handlers);
