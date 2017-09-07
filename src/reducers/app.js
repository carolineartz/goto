import { createReducer } from './utils';

import {
  APP_CHANGE_MODE,
  DARK,
  LIGHT
} from '../actions/app';

const initialState = {
  mode: DARK,
  scrollingDisabled: false
};

const handlers = {
  [APP_CHANGE_MODE]: (state, action) => ({
    mode: ((action.mode === DARK) ? LIGHT : DARK)
  })
};

export default createReducer(initialState, handlers);
