import { buildEndpoint } from './apiUtils';

export const IMAGE_LOCATION_SET = 'IMAGE_LOCATION_SET';
export const IMAGES_SET = 'IMAGES_SET';
export const IMAGES_CLEAR = 'IMAGES_CLEAR';

export const setImageLocation = (placeId) => ({
  type: IMAGE_LOCATION_SET,
  placeId
});

export const setImages = (images, page) => ({
  type: IMAGES_SET,
  images,
  page
});

export const clearImages = () => ({
  type: IMAGES_CLEAR
});

export const getImageLocation = ({round}) => {
  return (dispatch) => {
    return fetchImage(round)
      .then(placeId => dispatch(setImageLocation(placeId)));
  };
};

export const getImages = ({placeId, page}) => {
  return (dispatch) => {
    return fetchImages(placeId, page)
      .then(images => dispatch(setImages(images, page)));
  };
};


async function fetchImage(round) {
  const response = await fetch(buildEndpoint({per_page: '1', has_geo: '1', extras: 'geo', method: 'flickr.photos.search'}));
  const data = await response.json();
  return data.photos.photo[0].place_id;
}

async function fetchImages(placeId, page) {
  const response = await fetch(buildEndpoint({per_page: '10', page, extras: 'geo', place_id: placeId, method: 'flickr.photos.search'}));
  const data = await response.json();
  return data.photos.photo;
}

