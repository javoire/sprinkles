module.exports = function(features) {

  var store = {};

  for (var i = 0; i < features.length; i++) {
    store[features[i].id.toLowerCase()] = features[i];
  }

  return {
    find: function (id) {
      return store[id.toLowerCase()];
    },
    search: function (lat, lng) {

      var match = false;

      var country, coords;

      for (var i = 0; i < features.length; i++) {
        country = features[i];
        if (country.geometry.type === 'Polygon') {
          match = pointInPolygon(country.geometry.coordinates[0], [lng, lat]);
          if (match) {
            return {
              code: features[i].id,
              name: features[i].properties.name
            };
          }
        } else if (country.geometry.type === 'MultiPolygon') {
          coords = country.geometry.coordinates;
          for (var j = 0; j < coords.length; j++) {
            match = pointInPolygon(coords[j][0], [lng, lat]);
            if (match) {
              return {
                code: features[i].id,
                name: features[i].properties.name
              };
            }
          }
        }
      }

      return null;
    }
  };
}
