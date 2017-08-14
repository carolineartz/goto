import geolib from 'geolib';

export default class Distance {
  constructor({targetCoordinates, guessCoordinates}) {
    this.targetCoordinates = targetCoordinates;
    this.guessCoordinates = guessCoordinates;
  }

  calculate() {
    return geolib.getDistance(
      this.targetCoordinates,
      this.guessCoordinates
    )
  }
}
