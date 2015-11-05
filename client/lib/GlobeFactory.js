var DAT = require('../lib/globe');

var GlobeFactory = function() {};

GlobeFactory.prototype.createGlobe = function(element, countries) {
  var globe = new DAT.Globe(element, {
    countries: countries
  });
  return globe;
}

module.exports = new GlobeFactory();
