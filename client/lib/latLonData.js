module.exports = function(cb) {
  d3.json('data/country_lat_lon.json', function (error, latlon) {
    if (error) return console.warn(error);
    return cb(latLon)
  });
}
