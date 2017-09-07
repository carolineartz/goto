import Transis from 'transis';
import Round from './Round';
import Guess from './Guess';

import { calculateDistanceInMiles, calculateScore } from './scoring';

export default Transis.Model.extend('Round', function() {
  this.attr('number', 'number');
  this.attr('possiblePoints', 'number', { default: 100 });
  this.attr('images', 'identity', { default: [] });

  this.hasOne('place', 'Place');
  this.hasOne('guess', 'Guess');

  this.prop('placeId', {
    on: ['place'],
    get: (place) => place.externalId
  });

  this.prop('placeName', {
    on: ['place'],
    get: (place) => place.name
  });

  this.prop('score', {
    on: ['distance', 'possiblePoints'],
    get: (distance, possiblePoints) => {
      if (!distance) return;
      return calculateScore({distance, possiblePoints});
    }
  });

  this.prop('nextPageImagesNumber', {
    on: ['images'],
    get: (images) => images.length/2 + 1
  });

  this.prop('placeCoordinates', {
    on: ['place'],
    get: (place) => place.coordinates
  });

  this.prop('guessCoordinates', {
    on: ['guess'],
    get: (guess) => guess.coordinates
  });

  this.prop('distance', {
    on: ['placeCoordinates', 'guessCoordinates'],
    get: (placeCoordinates, guessCoordinates) => {
      if (!placeCoordinates || !guessCoordinates) return;
      return calculateDistanceInMiles({targetCoordinates: placeCoordinates, guessCoordinates});
    }
  });

  this.prototype.setGuessCoordinates = function(coordinates) {
    this.guess.setCoorindates({...coordinates});
    return this;
  };

  this.prototype.addImages = function(images) {
    this.images = [...this.images, ...images];
    return this;
  };

  this.prototype.reducePossiblePoints = function(by = 10) {
    this.possiblePoints -= 10;
    return this.possiblePoints;
  };

  this.prototype.init = function(props) {
    props = {...props, guess: new Guess()};
    Round.__super__.init.call(this, props);
  };
});
