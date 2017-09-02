import geolib from 'geolib';

const SCORE_MAPPING = new Map([
  [100, 100],
  [95, 300],
  [90, 500],
  [85, 750],
  [80, 1000],
  [65, 2000],
  [40, 6000],
  [30, 8000],
  [20, 10000],
  [0, 99999]
]);

const calculateDistanceInMiles = ({targetCoordinates, guessCoordinates}) => {
  const distance = geolib.getDistance(
    targetCoordinates,
    guessCoordinates
  );
  return geolib.convertUnit('mi', distance, 0);
};

const getPercent = (distanceInMiles) => {
  for (const [percent, maxDistance] of SCORE_MAPPING) {
    if (distanceInMiles <= maxDistance) return percent;
  }
};

const calculateScore = ({distance, possiblePoints}) => {
  const percent = getPercent(distance);
  return (possiblePoints * (percent/100));
};

export { calculateScore, calculateDistanceInMiles };
