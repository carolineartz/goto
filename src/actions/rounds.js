import { buildEndpoint } from './apiUtils';

export const ROUND_CREATED = 'ROUND_CREATED';
export const ROUND_LOCATION_INFO_FETCHING = 'ROUND_LOCATION_INFO_FETCHING';
export const ROUND_GUESS_LOCATION = "ROUND_GUESS_LOCATION";
export const ROUND_SELECT_MAP_LOCATION = "ROUND_SELECT_MAP_LOCATION";

export const fetchingRoundLocationInfo = ({placeId}) => ({
  type: ROUND_LOCATION_INFO_FETCHING,
  placeId
})

export const roundCreated = ({place}) => ({
  type: ROUND_CREATED,
  place
})

export const roundSelectMapLocation = ({guessCoordinates}) => ({
  type: ROUND_SELECT_MAP_LOCATION,
  guessCoordinates
})

export const roundGuessLocation = ({guessCoordinates, targetCoordinates}) => ({
  type: ROUND_GUESS_LOCATION,
  guessCoordinates,
  targetCoordinates
})






// **********************
//
//
export const createRound = ({placeId}) => {
  return (dispatch) => {
    dispatch(fetchingRoundLocationInfo({placeId}))
    return fetchLocationInfo(placeId)
      .then(place => dispatch(roundCreated({place})))
  }
}

// **********************
//
//
async function fetchLocationInfo(placeId) {
  const response = await fetch(buildEndpoint({place_id: placeId, method: 'flickr.places.getInfo'}))
  const data = await response.json();
  return data;
}
