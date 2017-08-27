import Transis from 'transis';
import Round from './Round';
import Guess from './Guess';
import Place from './Place';

import { calculateDistanceInMiles, calculateScore } from './scoring';

export default Transis.Model.extend('Round', function() {
  const ROUND_STATUS = this.ROUND_STATUS = {
    initiating: 'initiating',
    started: 'started',
    completed: 'completed'
  };

  this.attr('number', 'number');
  this.attr('status', 'string', { default: ROUND_STATUS.initiating });
  this.attr('possiblePoints', 'number', { default: 100 });

  this.hasOne('place', 'Place');
  this.hasOne('guess', 'Guess');

  this.prop('score', {
    on: ['isCompleted', 'distance', 'possiblePoints'],
    get: (isCompleted, distance, possiblePoints) => {
      if (!isCompleted) return;
      return calculateScore({distance, possiblePoints});
    }
  });

  this.prop('distance', {
    on: ['isCompleted', 'place.coordinates', 'guess.coordinates'],
    get: (isCompleted, placeCoordinates, guessCoordinates) => {
      if (!isCompleted) return;
      return calculateDistanceInMiles({targetCoordinates: placeCoordinates, guessCoordinates});
    }
  });

  this.prop('isInitiating', {
    on: ['status'],
    get: (status) => status === ROUND_STATUS.initiating
  });

  this.prop('isStarted', {
    on: ['status'],
    get: (status) => status === ROUND_STATUS.started
  });

  this.prop('isCompleted', {
    on: ['status'],
    get: (status) => status === ROUND_STATUS.completed
  });

  this.prop('guessMarker', {
    on: ['guess.coordinates'],
    get: (guessCoordinates) => {
      if (!guessCoordinates) return;
      return {
        type: 'guess',
        position: {
          lat: guessCoordinates.latitude,
          lng: guessCoordinates.longitude
        }
      };
    }
  });

  this.prop('placeMarker', {
    on: ['place.coordinates'],
    get: (placeCoordinates) => ({
      type: 'place',
      position: {
        lat: placeCoordinates.latitude,
        lng: placeCoordinates.longitude
      }
    })
  });

  this.prop('markers', {
    on: ['isInitiating', 'isStarted', 'isCompleted', 'placeMarker', 'guessMarker'],
    get: (isInitiating, isStarted, isCompleted, placeMarker, guessMarker) => {
      if (isInitiating) return [];
      if (isCompleted) return [guessMarker, placeMarker];
      return guessMarker ? [guessMarker] : [];
    }
  });

  this.prototype.advanceStatus = function() {
    const statuses = Object.keys(this.__proto__.constructor.ROUND_STATUS);
    this.status = statuses[statuses.indexOf(this.status) + 1];
    return this.status;
  };

  this.prototype.next = function(props) {
    return new this.__proto__.constructor({...props, number: this.number + 1});
  };

  this.prototype.reducePossiblePoints = function(by = 10) {
    this.possiblePoints -= 10;
    return this.possiblePoints;
  };

  this.prototype.init = function(props) {
    props = {...props, guess: new Guess(), place: new Place()};
    Round.__super__.init.call(this, props);
  };
});
