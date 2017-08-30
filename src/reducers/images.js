import {
  IMAGES_SET,
  IMAGES_CLEAR,
  IMAGE_PLACES_SET
} from '../actions/images';

import { createReducer } from './utils';

const initialState = {
  placeId: null,
  images: [],
  page: 0,
  places: []
};

const handlers = {
  [IMAGE_PLACES_SET]: (state, action) => ({
    places: action.places,
    placeId: action.places[0].place_id
  }),

  [IMAGES_SET]: (state, action) => {
    let images;
    if (action.page === 0) images = action.images;
    else images = [...state.images, ...action.images];
    return {
      images,
      page: action.page
    };
  },

  [IMAGES_CLEAR]: (state, action) => ({
    ...initialState, places: state.places
  })
};

export default createReducer(initialState, handlers);

