import Transis from 'transis';

export default Transis.Model.extend('Place', function() {
  this.attr('externalId', 'string');
  this.attr('name', 'string');
  this.attr('latitude', 'number');
  this.attr('longitude', 'number');

  this.prop('coordinates', {
    on: ['latitude', 'longitude'],
    get: (latitude, longitude) => ({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    })
  });
});
