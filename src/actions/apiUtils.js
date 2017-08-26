import queryString from 'query-string';

const FLICKR_API_KEY = 'd40ee562baf9070150afa3caf2e091b7';

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
};

export const buildSrc = ({farmId, serverId, id, secret}) => {
  if (process.env.NODE_ENV === 'development') {
    return `/api/flickr/${id}_${secret}.jpg`;
  }
  else {
    return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
  }
};

export const buildEndpoint = (query) => {
  if (process.env.NODE_ENV === 'development') {
    return buildDevEndpoint(query);
  }
  else {
    const baseQuery = {
      api_key: FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: '?'
    };
    const qs = queryString.stringify({...query, ...baseQuery});
    return `https://api.flickr.com/services/rest/?${qs}`;
  }
};


