import _ from 'lodash';

import {
  randomMomentBefore,
  buildTopPlacesEndpoint,
  buildEndpoint
} from './apiUtils';

import { Place, Round } from './../models';

import { gamePlacesFetchSuccess, gamePlacesFetchFailure } from './game';
import {
  roundImagesFetchSuccess,
  roundImagesFetchFailure,
  roundAllCreateSuccess,
  roundAllCreateFailure,
  roundImagesSet,
  roundImagesSetFailure
} from './round';

const fetchPlaces = async (num = 5) => {
  const date = randomMomentBefore();
  const placesResponse = await fetch(buildTopPlacesEndpoint({date}));
  const allPlacesData = await placesResponse.json();
  const groupedPlaces = _.groupBy(allPlacesData.places.place, (place) => place.place_url.split('/')[1]);

  return _.sampleSize(groupedPlaces, num).map(ar => {
    const { place_id, _content, latitude, longitude } = ar[0];
    return new Place({
      externalId: place_id,
      name: _content,
      latitude,
      longitude
    });
  });
};

const fetchImages = async (placeId, count, page) => {
  const response = await fetch(buildEndpoint({
    per_page: count,
    page,
    extras: 'geo',
    place_id: placeId,
    method: 'flickr.photos.search'})
  );
  const data = await response.json();
  return data.photos.photo;
};

export async function getPlaces(dispatch, getState, num) {
  try {
    const places = await fetchPlaces(num);
    dispatch(gamePlacesFetchSuccess(places));
    return places;
  }
  catch(error) {
    dispatch(gamePlacesFetchFailure(error));
  }
}

export async function createRounds(dispatch, getState) {
  try {
    const rounds = await Promise.resolve(
      getState().game.places.map((place, i) =>
        new Round({place, number: i + 1}))
    );
    dispatch(roundAllCreateSuccess(rounds));
  }
  catch(error) {
    dispatch(roundAllCreateFailure(error));
  }
}

export async function getRoundImages(dispatch, round, count, page) {
  try {
    const images = await fetchImages(round.placeId, count, page);
    dispatch(roundImagesFetchSuccess(round, images));
    return images;
  }
  catch(error) {
    dispatch(roundImagesFetchFailure(error));
  }
}

export async function setRoundsInitialImages(dispatch, getState) {
  try {
    const rounds = getState().round.all;
    const roundsImages = await Promise.all(
      rounds.map(round => getRoundImages(dispatch, round, 10, 1))
    );
    _.zipWith(rounds, roundsImages, (round, images) => {
      dispatch(roundImagesSet(round.addImages(images)));
    });
  }
  catch(error) {
    dispatch(roundImagesSetFailure(error));
  }
}
