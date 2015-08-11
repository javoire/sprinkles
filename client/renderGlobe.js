function renderUserDataOnGlobe(userCountryData, worldData) {
  var nickInput = document.getElementById('nickInput');
  var nick = nickInput.value || 'eshuu';

  var countries = topojson.feature(worldData, worldData.objects.countries);

  var geo = geodecoder(countries.features);


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
      var rgb = 'rgba(' + baseRed + ', ' + baseGreen + ', ' + baseBlue + ', ' + alpha +')';
      console.log(rgb);
      textures.push(mapTexture({features: [countryGeojson], type: "FeatureCollection"}, rgb , 'black'));
    }
  });

  // google stuff
  var map = document.getElementById('map');
  var globe = new DAT.Globe(map, {
    myCoolTexture: mapTexture(countries, '#222', 'black'),
    overlayTextures: textures
  });
  console.log(globe);
  var titlebar = document.querySelector('#country-list h2');
  titlebar.appendChild(document.createTextNode('These are your top countries, ' + nick));
  globe.animate();

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