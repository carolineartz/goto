import geolib from 'geolib';

const SCORE_MAPPING = new Map([
  [100, 100],
  [95, 1000],
  [90, 1500],
  [85, 2500],
  [80, 4000],
  [60, 6000],
  [40, 8000],
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
