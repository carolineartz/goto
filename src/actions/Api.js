import _ from 'lodash';
import Place from './../models/Place';

import { randomMomentBefore, buildTopPlacesEndpoint, buildEndpoint } from './apiUtils';

const firstLocale = (place) => place.place_url.split('/')[1];

export async function fetchPlaces() {
  const date = randomMomentBefore();
  const placesResponse = await fetch(buildTopPlacesEndpoint({date}));
  const allPlacesData = await placesResponse.json();
  const groupedPlaces = _.groupBy(allPlacesData.places.place, firstLocale);

  return _.sampleSize(groupedPlaces, 5).map(ar => {
    const place = ar[0];
    return new Place({
      externalId: place.place_id,
      name: place._content,
      latitude: place.latitude,
      longitude: place.longitude
    });
  });
}

export async function fetchImages(placeId, count, page) {
  const response = await fetch(buildEndpoint({per_page: count, page, extras: 'geo', place_id: placeId, method: 'flickr.photos.search'}));
  const data = await response.json();
  return data.photos.photo;
}
