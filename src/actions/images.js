import _ from 'lodash';

import { buildEndpoint, buildTopPlacesEndpoint, randomMomentBefore } from './apiUtils';

export const IMAGES_SET = 'IMAGES_SET';
export const IMAGES_CLEAR = 'IMAGES_CLEAR';
export const IMAGE_PLACES_SET = 'IMAGE_PLACES_SET';

export const setImages = (images, page) => ({
  type: IMAGES_SET,
  images,
  page
});

export const setPlaces = (places) => ({
  type: IMAGE_PLACES_SET,
  places
});

export const clearImages = () => ({
  type: IMAGES_CLEAR
});

export const getImages = ({placeId, page, more = false} = {}) => {
  return (dispatch) => {
    page = more ? page + 1 : page;
    const count = more ? '5' : '10';
    return fetchImages(placeId, count, page)
      .then(images => dispatch(setImages(images, page)));
  };
};

export const initialGetImages = () => {
  return (dispatch) => {
    fetchPlaces()
      .then(places => dispatch(setPlaces(places)))
      .then(action => getImages({placeId: action.places[0].place_id, page: 1}));
  };
};

async function fetchImages(placeId, count, page) {
  const response = await fetch(buildEndpoint({per_page: count, page, extras: 'geo', place_id: placeId, method: 'flickr.photos.search'}));
  const data = await response.json();
  return data.photos.photo;
}

const firstLocale = (place) => place.place_url.split('/')[1];

async function fetchPlaces() {
  const date = randomMomentBefore();
  const placesResponse = await fetch(buildTopPlacesEndpoint({date}));
  const placesData = await placesResponse.json();
  const groupedPlaces = _.groupBy(placesData.places.place, firstLocale);
  return _.sampleSize(groupedPlaces, 5).map(ar => ar[0]);
}
