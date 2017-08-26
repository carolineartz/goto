import geolib from 'geolib';

export default class Distance {
  constructor({targetCoordinates, guessCoordinates}) {
    this.targetCoordinates = targetCoordinates;
    this.guessCoordinates = guessCoordinates;
  }

  miles() {
    return geolib.convertUnit('mi', this.calculate(), 2);
  }

  calculate() {
    return geolib.getDistance(
      this.targetCoordinates,
      this.guessCoordinates
    );
  }
}
