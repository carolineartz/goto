import queryString from 'query-string';
import moment from 'moment';

const FLICKR_API_KEY = 'd40ee562baf9070150afa3caf2e091b7';

const getRandomNum = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

export const randomMomentBefore = ({when = moment(), min = 2, max = 1000} = {}) => (
  when.subtract(Math.round(getRandomNum(min, max)), 'days')
);

const buildDevEndpoint = (query) => {
  const { method, per_page: perPage } = query;
  if (method === 'flickr.photos.search' && perPage === '1') {
    return '/api/initialPhoto.json';
  }
  else if (method === 'flickr.photos.search') {
    return '/api/locationPhotosPage1.json';
  }
  else if (method === 'flickr.places.getInfo') {
    return '/api/place.json';
  }
  else if (method === 'flickr.places.getTopPlacesList') {
    return '/api/topPlaces.json';
  }
};

export const buildSrc = ({farmId, serverId, id, secret}) => {
  // if (process.env.NODE_ENV === 'development') {
  //   return `/api/flickr/${id}_${secret}.jpg`;
  // }
  // else {
    return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
  // }
};


export const buildEndpoint = (query) => {
  // if (process.env.NODE_ENV === 'development') {
  //   return buildDevEndpoint(query);
  // }
  // else {
    const baseQuery = {
      api_key: FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: '?'
    };
    const qs = queryString.stringify({...query, ...baseQuery});
    return `https://api.flickr.com/services/rest/?${qs}`;
  // }
};

export const buildTopPlacesEndpoint = ({date = moment()}) => {
  const placesQuery = {
    method: 'flickr.places.getTopPlacesList',
    place_type_id: '7',
    date: date.format('YYYY-MM-DD')
  };

  return buildEndpoint(placesQuery);
};

export const buildInitialEndpoint = (query) => {
  const maxDate = randomMomentBefore();
  const minDate = randomMomentBefore({when: maxDate});

  const timeQuery = {
    min_date_upload: minDate.unix(),
    max_date_upload: maxDate.unix()
  };

  return buildEndpoint({...query, ...timeQuery});
};

