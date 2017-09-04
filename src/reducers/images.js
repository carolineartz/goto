import { createReducer } from './utils';

import {
  IMAGE_SELECT,
  IMAGE_DESELECT,
} from '../actions/images';

const initialState = {
  selectedSrc: undefined
};

const handlers = {
  [IMAGE_SELECT]: (state, action) => ({
    selectedSrc: action.imageSrc
  }),

  [IMAGE_DESELECT]: (state, action) => ({
    selectedSrc: undefined
  })
};

export default createReducer(initialState, handlers);

