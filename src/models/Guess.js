import Transis from 'transis';

export default Transis.Model.extend('Guess', function() {
  this.attr('latitude', 'number');
  this.attr('longitude', 'number');

  this.prop('coordinates', {
    on: ['latitude', 'longitude'],
    get: (latitude, longitude) => {
      if (!latitude || !longitude) return;
      return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
    }
  });

  this.prototype.setCoorindates = function({latitude, longitude}) {
    this.latitude = latitude;
    this.longitude = longitude;
    return this;
  };
});
