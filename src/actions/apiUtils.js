import queryString from 'query-string';

const FLICKR_API_KEY = "d40ee562baf9070150afa3caf2e091b7"

export const buildEndpoint = (query) => {
  const baseQuery = {
    api_key: FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: '?'
  }
  const qs = queryString.stringify({...query, ...baseQuery});
  return `https://api.flickr.com/services/rest/?${qs}`
}
