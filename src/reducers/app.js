import { CHANGE_APP_MODE, DARK, LIGHT } from '../actions/app';
import { createReducer } from './utils';

const initialState = {
  mode: DARK
};

const handlers = {
  [CHANGE_APP_MODE]: (state, action) => ({
    mode: ((action.mode === DARK) ? LIGHT : DARK)
  })
};

export default createReducer(initialState, handlers);
