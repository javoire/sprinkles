var DAT = require('../lib/globe');
var worldDataStore = require('../store/worldDataStore');

var GlobeFactory = function() {};

GlobeFactory.prototype.createGlobe = function(element, countries) {
  var worldData = worldDataStore.getData();
  var countries = topojson.feature(worldData, worldData.objects.countries);

  var globe = new DAT.Globe(element, {
    countries: countries
  });
  return globe;
}

module.exports = new GlobeFactory();
