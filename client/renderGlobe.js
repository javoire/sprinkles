function renderUserDataOnGlobe(userCountryData, worldData) {
  var nickInput = document.getElementById('nickInput');
  var nick = nickInput.value || 'eshuu';

  var countries = topojson.feature(worldData, worldData.objects.countries);

  var geo = geodecoder(countries.features);

  // get the geojson for some countries
  var someCountriesGeojson = { features: [], type: "FeatureCollection" };
  userCountryData.forEach(function(country) {
    var countryGeojson = geo.find(country.country);
    if (countryGeojson) {
      someCountriesGeojson.features.push(countryGeojson)
    }
  });

  var overlayTexture = mapTexture(someCountriesGeojson, 'rgb(46, 189, 89)', 'black');

  // google stuff
  var map = document.getElementById('map');
  var globe = new DAT.Globe(map, {
    myCoolTexture: mapTexture(countries, '#222', 'black'),
    overlayTexture: overlayTexture
  });
  console.log(globe);
  var titlebar = document.querySelector('#country-list h2');
  titlebar.appendChild(document.createTextNode('These are your top countries, ' + nick));
  globe.animate();

  countriesTopList(userCountryData); // print countries toplist in DOM

  document.body.style.backgroundImage = 'none'; // remove loading
}

function renderGlobe(worldData) {
  var countries = topojson.feature(worldData, worldData.objects.countries);
  var map = document.getElementById('map');
  var globe = new DAT.Globe(map, {
    myCoolTexture: mapTexture(countries, '#222', 'black')
  });
  globe.animate();

  document.body.style.backgroundImage = 'none'; // remove loading
}