import { IMAGE_LOCATION_SET, IMAGES_SET, IMAGES_CLEAR } from '../actions/images';
import { createReducer } from './utils';

const initialState = {
  placeId: null,
  images: [],
  page: 0
};

const handlers = {
  [IMAGE_LOCATION_SET]: (state, action) => ({
    placeId: action.placeId,
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
    ...initialState
  })
};

export default createReducer(initialState, handlers);

