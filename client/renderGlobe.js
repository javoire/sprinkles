function renderUserDataOnGlobe(userCountryData) {
  var nickInput = document.getElementById('nickInput');
  var nick = nickInput.value || 'eshuu';

  var baseRed = 46;
  var baseGreen = 189;
  var baseBlue = 89;
  var textures = [];
  userCountryData.sort(function (a, b) {
    return b.percent - a.percent;
  });
  var maxval = userCountryData[0].percent * 100;
  userCountryData.forEach(function (country) {
    var countryGeojson = geo.find(country.country);
    if (countryGeojson) {
      var alpha = country.percent * 100 / maxval;
      var rgb = 'rgba(' + baseRed + ', ' + baseGreen + ', ' + baseBlue + ', ' + alpha + ')';
      console.log(rgb);
      textures.push(mapTexture({features: [countryGeojson], type: "FeatureCollection"}, rgb, 'black'));
    }
  });

  globe.updateOverlays(textures);
  countriesTopList(userCountryData);

  document.body.style.backgroundImage = 'none'; // remove loading
}

function renderGlobe(worldData) {
  var countries = topojson.feature(worldData, worldData.objects.countries);
  var map = document.getElementById('map');
  var globe = new DAT.Globe(map, {
    myCoolTexture: mapTexture(countries, '#222', 'black')
  });
  return globe;
  document.body.style.backgroundImage = 'none'; // remove loading
}

function renderSpotifyDataOnGlobe(countryCodes) {
  document.body.style.backgroundImage = 'none'; // remove loading

  var baseRed = 46;
  var baseGreen = 189;
  var baseBlue = 89;
  var rgb = 'rgb(' + baseRed + ', ' + baseGreen + ', ' + baseBlue + ')';

  var countriesGeoJson = {features: [], type: "FeatureCollection"};


  countryCodes.forEach(function (countryCode) {

    console.log(ISO3166.codeToCountry[countryCode]);
    var countryGeojson = geo.find(ISO3166.codeToCountry[countryCode]);
    if (countryGeojson) {
      var alpha = 1.0;
      console.log(rgb);
      countriesGeoJson.features.push(countryGeojson)
    }
  });
  console.log(countriesGeoJson);
  textures = mapTexture(countriesGeoJson, rgb, 'black');
  globe.updateOverlays([textures]);

  setInterval(function () {
    var countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    var country = {country: ISO3166.codeToCountry[countryCode]};
    console.log(country);
    if (country.country) panToCountry(country);
  }, 2000)

}