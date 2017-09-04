import { createReducer } from './utils';

import {
  APP_CHANGE_MODE,
  APP_DISABLE_SCROLL,
  APP_ENABLE_SCROLL,
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
  }),

  [APP_DISABLE_SCROLL]: (state, action) => ({
    scrollingDisabled: true
  }),

  [APP_ENABLE_SCROLL]: (state, action) => ({
    scrollingDisabled: false
  })
};

export default createReducer(initialState, handlers);
