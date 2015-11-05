//TODO: this should probably be moved to globe.

var previouslySelectedCountry;
module.exports = function(selectedCountry) {
  if (previouslySelectedCountry !== selectedCountry) {
    countryLatLon = latLonData.countries[ISO3166.countryToCode[selectedCountry.country.toUpperCase()]];
    if (countryLatLon) {
      globe.highLightCountry(selectedCountry);
      globe.target.y = (countryLatLon.lat * Math.PI / 180);
      var targetX0 = wrap((countryLatLon.lon * Math.PI / 180) + (Math.PI / -2 ), -Math.PI, Math.PI);
      var targetX0Neg = targetX0 - Math.PI * 2;
      var targetX0Pos =  targetX0 + Math.PI * 2;
      console.log("Neg:" + targetX0Neg);
      console.log("Pos:" + targetX0Pos);
      console.log(globe.target.y);
      if (Math.abs(targetX0Neg - globe.target.x) < Math.PI) {
        targetX0= targetX0Neg;
      } else if (Math.abs(targetX0Pos - globe.target.x) < Math.PI) {
        targetX0 = targetX0Pos;
      }
      globe.target.x = wrap(targetX0, -Math.PI, Math.PI);
    }
    previouslySelectedCountry = selectedCountry;
  }
}
